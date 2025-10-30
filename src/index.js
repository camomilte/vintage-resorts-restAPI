//Dependensies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Database connection
import pool from '../config/db.js';
// Routes
import userRoutes from './user/user.routes.js';
import authRouter from './auth/auth.routes.js';
import listingRouter from './listing/listing.routes.js';
import amenityRouter from './amenities/amenities.routes.js';
// Error handler
import errorHandling from './middleware/errorHandling.middleware.js';
import resvRouter from './reservation/reservation.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());


/// /
// All routes
/// /
app.use("/api", userRoutes);                        // User routes
app.use("/api", authRouter);                   // Authorisation routes
app.use("/api", amenityRouter);  // Amenity routes
//TODO: Add pets_allowed to all listings
app.use("/api", listingRouter);            // Listing routes
app.use("/api", resvRouter);           // Reservation routes


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