const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const app = express();
const fs = require('fs');
const jela = [];



app.use( express.static( path.join(__dirname, 'static') ) );

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', '12222RN.html'));
});

app.use('/novproizvod', BP.urlencoded({extended: false}));


app.post("/novproizvod", (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().required(),
        boja: Joi.string().trim().required(),
        cena: Joi.number().greater(0).required()
    });

    const {error, succ} = shema.validate(req.body);

    if(error){
        res.send("Greska: " + error.details[0].message);
	    return;
    } else {
        fs.appendFile("proizvod.txt", 
                 "\n" + JSON.stringify(req.body), 
                 function(err, succ){
                     res.send("Poruka je poslana, očekujte odgovor uskoro");
                 }
            );
    }



})

app.get("/proizvodi", (req, res) => {
    //res.send("Svi proizvodi");

    fs.readFile('proizvod.txt', 'utf8', (err, data) => {
        
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        }

        const redovi = data.split('\n');
        for(let i=0; i<redovi.length; i++){
            let obj = JSON.parse( redovi[i] );
            jela.push(obj);
        }
        res.json(jela);

      });
      
})
    


app.listen(8000);

