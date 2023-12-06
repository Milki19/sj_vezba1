const express = require('express');

const { sequelize, Proizvod, Kategorija, ProizvodMaterijal, Materijal, StavkaNarudzbine, Narudzbina } = require("./models");

const cors = require("cors");

const app = express();
const corsOptions = {
	origin: ['http://localhost:8000', 'http://127.0.0.1:8000']
  };
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});


const bojaRoutes = require("./routes/materijal.js");
app.use("/materijal", bojaRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

const proizvodRoutes = require("./routes/proizvod.js");
app.use("/proizvod", proizvodRoutes);

app.put("/promeni-cenu/:id", async (req,res)=>{
	try{
   	   	const jelo = await Proizvod.findByPk(req.params.id);
    	jelo.cena = req.body.cena;
    	jelo.save();
    	return res.json(jelo);
	} catch(err){
    	console.log(err);
    	res.status(500).json({ error: "Greska", data: err });
	}
});



app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:8000");
	await sequelize.sync();
	console.log("DB synced");
});
