'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Appointment.init({
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idDokter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waktu: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (new Date(value) < new Date()) {
            throw new Error("invalid date");
          }
        }
      }
    },
    noUrut: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};