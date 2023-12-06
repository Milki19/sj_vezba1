const express = require("express");
const { sequelize, Narudzbina} = require("../models");


const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const proizvodi = await Narudzbina.findAll();
        return res.json(proizvodi);        
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
        const kategorije = await Narudzbina.findByPk(req.params.id);
        return res.json(kategorije);        
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 

 route.post("/", async (req, res) => {
    try{
        const novi = await Narudzbina.create(req.body);
        return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/:id", async (req, res) => {
    try{
        const proizvod = await Narudzbina.findByPk(req.params.id);
    	proizvod.naziv = req.body.naziv;
    	proizvod.opis = req.body.opis;
        proizvod.boja = req.body.boja;
    	proizvod.cena = req.body.cena;
    	proizvod.kategorija_id = req.body.kategorija_id;
    	proizvod.save();
    	return res.json(proizvod);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.delete("/:id", async (req, res) => {
    try{
        const proizvod = await Narudzbina.findByPk(req.params.id);
        proizvod.destroy();
        return res.json( proizvod.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 



