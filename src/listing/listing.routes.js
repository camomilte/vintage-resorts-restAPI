import express from 'express';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createListingSchema } from './listing.validation.js';
import { createListing, deleteListing, getAllListings, getListingById } from './listing.controller.js';
import { verifyToken } from '../auth/auth.middleware.js';

// Initialize router for listing endpoints
const listingRouter = express.Router();

// Create new listing
listingRouter.post("/", validateBody(createListingSchema), verifyToken, createListing);

// Get all listings
listingRouter.get("/", getAllListings);

// Get single listing by id
listingRouter.get("/:listing_id", getListingById);

// Update listing

// Delete listing
listingRouter.delete("/:listing_id", verifyToken, deleteListing);

// Export router
export default listingRouter;