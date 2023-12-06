'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Proizvod}) {
      this.hasMany(Proizvod, {foreignKey: "kategorija_id", as: "kategorija"});
    }
  }
  Kategorija.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kategorija',
  });
  return Kategorija;
};