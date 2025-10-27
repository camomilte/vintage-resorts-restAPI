import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from '../config/db.js';
import userRoutes from './user/user.routes.js';
import errorHandling from './middleware/errorHandling.middleware.js';
import authRouter from './auth/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// App routes
app.use("/api", userRoutes);
app.use("/api/auth", authRouter);

// Error handler
app.use(errorHandling);

// Testing postgres connection
app.get("/", async(req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is : ${result.rows[0].current_database}`)
});

app.listen(port,() => {
  console.log(`Server is running on http://localhost:${port}`);
});