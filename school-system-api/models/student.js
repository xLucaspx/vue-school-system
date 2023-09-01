"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 75] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 50],
          is: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g,
        },
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // isCpf(value): create function that validates the cpf and returns true or throws error
          is: /[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/,
        },
      },
    },
    {
      sequelize,
      modelName: "student",
      freezeTableName: true,
      defaultScope: {
        attributes: ["id", "name", "email", "cpf"],
      },
    }
  );
  return Student;
};
