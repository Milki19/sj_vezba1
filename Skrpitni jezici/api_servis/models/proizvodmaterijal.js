'use strict';
const {
  Model
} = require('sequelize');
const proizvod = require('./proizvod');
module.exports = (sequelize, DataTypes) => {
  class ProizvodMaterijal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Proizvod, Materijal}) {
      this.belongsTo(Proizvod, {foreignKey: "proizvod_id", as: "proizvod"});
      this.belongsTo(Materijal, {foreignKey: "materijal_id", as: "materijal"});
    }
  }
  ProizvodMaterijal.init({
    proizvod_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
      materijal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
  }, {
    sequelize,
    modelName: 'ProizvodMaterijal',

  });
  return ProizvodMaterijal;
};