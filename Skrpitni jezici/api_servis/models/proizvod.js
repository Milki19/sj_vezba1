'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proizvod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Kategorija, Materijal, StavkaNarudzbine}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "proizvod_id", as: "stavke"});
      this.belongsToMany(Materijal, {foreignKey: "proizvod_id", as: "materijali", through:"ProizvodMaterijal"});
    }
  }
  Proizvod.init({
    naziv: DataTypes.STRING,
    opis: DataTypes.STRING,
    boja: DataTypes.STRING,
    cena: DataTypes.DECIMAL,
    kategorija_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
  }, 
  
  {
    sequelize,
    modelName: 'Proizvod',
  });
  return Proizvod;
};