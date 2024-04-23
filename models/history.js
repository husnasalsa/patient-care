'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Doctor)
    }
  }
  History.init({
    idUser: DataTypes.STRING,
    idDokter: DataTypes.STRING,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};