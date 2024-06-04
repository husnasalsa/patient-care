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
    }
  }
  History.init({
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
    },
    biayaKonsultasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};