'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM('HR', 'Employee'),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        grade: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        job_location: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        reporting_manager: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        joining_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'created_at',
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updated_at',
          defaultValue: Sequelize.NOW,
        }
      }) 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};