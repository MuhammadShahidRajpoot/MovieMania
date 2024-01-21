'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("123456", saltRounds);

      const superAdmin = await queryInterface.sequelize.query(
        'SELECT * FROM users WHERE email = :email ',
        {
          replacements: {
            email: 'super_admin@assignment.com',
          },
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      if (!superAdmin.length) {
        await queryInterface.sequelize.query(
          'INSERT INTO users (user_name,email, password) VALUES ( :user_name, :email, :password)',
          {
            replacements: {
              user_name: "Super_Admin",
              email: "super_admin@movie.com",
              password: hashedPassword,
            },
            type: queryInterface.sequelize.QueryTypes.INSERT,
          }
        );
      }
     
    } catch (error) {
      console.log('Error in add super_admin and admin', error);
      throw new Error(error);
    }


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.sequelize.bulkDelete('People', null, {});
     */
  }
};
