import express from 'express';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createAmenitySchema } from './amenities.validation.js';
import { verifyToken } from '../auth/auth.middleware.js';
import { createAmenity, deleteAmenity, getAllAmenities, getAllEras, getAmenitiesByListing, getAmenityById } from './amenities.controller.js';

// Initialize router for amneity endpoints
const amenityRouter = express.Router();

// Create new amenity
amenityRouter.post("/listings/amneities", validateBody(createAmenitySchema), verifyToken, createAmenity);

// Get all amenities
amenityRouter.get("/listings/amenities", getAllAmenities);

// Get all eras
amenityRouter.get("/listings/eras", getAllEras);

// Get single amenity by id
amenityRouter.get("/listings/amenities/:amenity_id", getAmenityById);

// Delete amenity
amenityRouter.delete("/listings/amenities/:amenity_id", verifyToken, deleteAmenity);

// Get all amenities from one listing
amenityRouter.get("/listings/:listing_id/amenities", getAmenitiesByListing);



// Update amenity


// Export router
export default amenityRouter;