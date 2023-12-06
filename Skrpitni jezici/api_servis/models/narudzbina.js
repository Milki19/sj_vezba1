'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({StavkaNarudzbine}) {
      this.hasMany(StavkaNarudzbine, {foreignKey: "narudzbina_id", as: "stavke"});
    }
  }
  Narudzbina.init({
    zakazanoVreme: DataTypes.STRING,
    status: DataTypes.STRING,
    cena: DataTypes.DECIMAL,
    adresa: DataTypes.STRING,
    razlogDolaska: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};