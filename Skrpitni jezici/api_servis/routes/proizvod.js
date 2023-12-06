const express = require("express");
const { sequelize, Kategorija, Proizvod} = require("../models");


const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const proizvodi = await Proizvod.findAll({include: {model: Kategorija, as: "kategorija"}});
        return res.json(proizvodi);        
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
        const kategorije = await Proizvod.findByPk(req.params.id);
        return res.json(kategorije);        
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 

 route.post("/", async (req, res) => {
    try{
        const novi = await Proizvod.create(req.body);
        return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/:id", async (req, res) => {
    try{
        const proizvod = await Proizvod.findByPk(req.params.id);
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
        const proizvod = await Proizvod.findByPk(req.params.id);
        proizvod.destroy();
        return res.json( proizvod.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 



