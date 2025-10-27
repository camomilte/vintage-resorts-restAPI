// Import dependencies 
import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables into process.env
dotenv.config();

// Destructure Pool class from pg package
const { Pool } = pkg;

// Create new connection pool
const pool = new Pool ({
  user: process.env.DB_USER,            // Database username
  host: process.env.DB_HOST,            // Database host
  database: process.env.DB_NAME,        // Database name
  password: process.env.DB_PASSWORD,    // Database password
  port:process.env.DB_PORT              // Database port
});

// Event listener that logs when connection to database is established
pool.on("connect", () => {
  console.log("Connection pool established with database");
});

// Export pool
export default pool;