'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    static associate(models) {
      Leave.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  
  Leave.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull:true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull:true
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      leave_type: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'Leave',
      tableName: 'Leaves',
    }
  );

  return Leave;
};
