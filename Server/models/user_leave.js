'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Leave extends Model {
    static associate(models) {
      User_Leave.belongsTo(models.User, {
        foreignKey:'user_id',
        as:'user'
      })
    }
  }
  User_Leave.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      leave_type: {
        type: DataTypes.ENUM('Casual Leave','Sick Leave'),
        allowNull:true,
        defaultValue: 'Casual Leave',
      },  
      total_leave:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:12
      },
      leave_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 12,
      },
      user_id: {
        type: DataTypes.INTEGER,
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
    modelName: 'User_Leave',
  });
  return User_Leave;
};