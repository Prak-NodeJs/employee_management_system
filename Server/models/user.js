'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Leave, {
        foreignKey: 'user_id',
        as: 'leaves',
      });
      User.hasMany(models.Reimbursement, {
        foreignKey: 'user_id',
        as: 'reimbursements',
      });
    }
  }
  
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('HR', 'Employee'),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reporting_manager: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      joining_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
      },
       
    },
    {
      sequelize,
      modelName: 'User'
    }
  );

  return User;
};
