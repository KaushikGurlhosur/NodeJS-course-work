const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "kaushik@373$", {
  dialect: "mysql",
  host: "localhost",
}); // creating a new instance of Sequelize connecting to the database
// with the name node-complete, username root and password kaushik@373$
// with the dialect mysql and host localhost

module.exports = sequelize; // exporting the instance of Sequelize
