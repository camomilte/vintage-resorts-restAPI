import { response } from "express";
import handleResponse from "../middleware/responseHandling.middleware.js";

/// /
// Create listing
/// /
export const createListing = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds } = req.body;

    // Call service to create listing
    const newListing = await createListingService(title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds);

    // Success response
    handleResponse(res, 201, "Listing created successfully", newListing);

  } catch (err) {

    //Pass error to errorHandler
    next(err);
  }
};

/// /
// Get all listings
/// /
export const getAllListings = async (req, res, next) => {
  try {
    // Call service to fetch all listings
    const listings = await getAllListingsService();

    // Success response
    handleResponse(res, 200, "All lisings fetched", listings);

  } catch (err) {
    
    //Pass error to errorHandler
    next(err);

  }
};

/// /
// Get single listing by id
/// /
export const getListingById = async (req, res, next) => {
  try {
    // Call service to fetch listing by id
    const listing = await getListingByIdService(req.params.listing_id);

    // If no listing is found, return error
    if(!listing) {
      const error = new Error("Listing could not be found");
      error.status = 404;
      error.type = "https://example.com/not-found"
      throw error;
    };

    // Success response
    handleResponse(res, 200, "Listing fetched successfully", listing);

  } catch (err) {
    
    //Pass error to errorHandler
    next(err);

  }
};

/// /
// Delete listing
/// /
export const deleteListing = async (req, res, next) => {
  try {
    // Call service to delete listing
    const deletedListing = await deleteListingService(req.params.listing_id);

    // Success response
    handleResponse(res, 200, "Listing deleted", deletedListing);

  } catch (err) {
       
    //Pass error to errorHandler
    next(err);

  }
};
