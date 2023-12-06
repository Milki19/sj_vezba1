'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materijal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Proizvod}) {
      this.belongsToMany(Proizvod, {foreignKey: "materijal_id", as: "proizvod", through:"ProizvodMaterijal"});
    }
  }
  Materijal.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materijal',
  });
  return Materijal;
};