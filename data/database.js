const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "todo_list",
	password: process.env.password,
});

module.exports = pool;
