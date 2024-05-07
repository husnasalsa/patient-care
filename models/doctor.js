'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Doctor.init({
    nama: DataTypes.STRING,
    spesialis: DataTypes.STRING,
    alamatPraktek: DataTypes.STRING,
    telepon: DataTypes.STRING,
    email: DataTypes.STRING,
    srcFoto: DataTypes.STRING,
    hargaKonsultasi: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};