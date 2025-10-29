import handleResponse from "../middleware/responseHandling.middleware.js";
import { createListingService, deleteListingService, getAllListingsService, getListingByIdService } from "./listing.service.js";

/// /
// Create listing
/// /
export const createListing = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds, amenities } = req.body;
    // Get user from token
    const host_id = req.user.user_id;

    // Call service to create listing
    const newListing = await createListingService(host_id, title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds, amenities);

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
      
      // Pass to middleware
      return next(error);
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
    // Get listing id
    const { listing_id } = req.params;
    // Get host id
    const host_id = req.user.user_id;

    // Call service to delete listing
    const deletedListing = await deleteListingService(listing_id, host_id);


    if(!deletedListing) {
      const error = new Error("Listing could not be found");
      error.status = 404;
      error.type = "https://example.com/not-found";
      
      // Pass to middleware
      return next(error);
    };

    // Success response
    handleResponse(res, 200, "Listing deleted", deletedListing);

  } catch (err) {
       
    //Pass error to errorHandler
    next(err);

  }
};
