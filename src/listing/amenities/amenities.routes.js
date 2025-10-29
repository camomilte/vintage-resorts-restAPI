import express from 'express';
import { validateBody } from '../../middleware/validateBody.middleware.js';
import { createAmenitySchema } from './amenities.validation.js';
import { verifyToken } from '../../auth/auth.middleware.js';
import { createAmenity, deleteAmenity, getAllAmenities, getAmenityById } from './amenities.controller.js';

// Initialize router for amneity endpoints
const amenityRouter = express.Router();

// Create new amenity
amenityRouter.post("/", validateBody(createAmenitySchema), verifyToken, createAmenity);

// Get all amenities
amenityRouter.get("/", getAllAmenities);

// Get single amenity by id
amenityRouter.get("/:amenity_id", getAmenityById);

// Update amenity

// Delete amenity
amenityRouter.delete("/:amenity_id", verifyToken, deleteAmenity);

// Export router
export default amenityRouter;