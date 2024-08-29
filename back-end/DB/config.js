const { Pool } = require("pg");

// Create a pool of connections to your PostgreSQL database
const pool = new Pool({
  host: "localhost", // Replace with your database host
  user: "postgres", // Replace with your database user
  password: "root", // Replace with your database password
  database: "webapp", // Replace with your database name
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
