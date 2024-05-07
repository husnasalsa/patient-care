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
    idDokter: DataTypes.STRING,
    kuota: DataTypes.INTEGER,
    hari: {
      type: DataTypes.ENUM,
      values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    },
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};