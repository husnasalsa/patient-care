'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.belongsTo(models.Doctor)
    }
  }
  Schedule.init({
    idDokter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kuota:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hari: {
      type: DataTypes.ENUM,
      values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};