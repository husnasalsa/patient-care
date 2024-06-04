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
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spesialis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamatPraktek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    srcFoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hargaKonsultasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};