import express from 'express';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createAmenitySchema } from './amenities.validation.js';
import { verifyToken } from '../auth/auth.middleware.js';
import { createAmenity, deleteAmenity, getAllAmenities, getAmenityById } from './amenities.controller.js';

// Initialize router for amneity endpoints
const amenityRouter = express.Router();

// Create new amenity
amenityRouter.post("/listings/amneities", validateBody(createAmenitySchema), verifyToken, createAmenity);

// Get all amenities
amenityRouter.get("/listings/amenities", getAllAmenities);

// Get single amenity by id
amenityRouter.get("/listings/amenities/:amenity_id", getAmenityById);

// Get all amenities from one listing
//"/listings/:listing_id/amenities"

// Update amenity

// Delete amenity
amenityRouter.delete("listings/amenities/:amenity_id", verifyToken, deleteAmenity);

// Export router
export default amenityRouter;