import handleResponse from "../middleware/responseHandling.middleware.js";
import { createAmenityService, deleteAmenityService, getAllAmenitiesService, getAllErasService, getAmenitiesByListingService, getAmenityByIdService } from "./amenities.service.js";

/// /
// Create amenity
/// /
export const createAmenity = async (req, res, next) => {
  try {
    // Get fields from request body
    const { amenity_name, description } = req.body;

    // Call service to create new amenity
    const newAnemity = await createAmenityService(amenity_name, description);

    // Success response
    handleResponse(res, 201, "Amenity created successfully", newAnemity);

  } catch (err) {
    //Pass error to errorHandler
    next(err);
  }
};

/// /
// Get all amenities (except eras)
/// /
export const getAllAmenities = async (req, res, next) => {
  try {
    // Call service to get all amentities
    const data = await getAllAmenitiesService();

    // Success response
    res.status(200).json({data});

  } catch (err) {
    
    //Pass error to errorHandler
    next(err);
  }
}

/// /
// Get all eras
/// /
export const getAllEras = async (req, res, next) => {
  try {
    // Call service to get eras
    const data = await getAllErasService();

    //Success response
    res.status(200).json({data});

  } catch (err) {
    //Pass error to errorHandler
    next(err);
  }
}

/// /
// Get all amenities from listing
/// /
export const getAmenitiesByListing = async (req, res, next) => {
  try {
    // Get listing id from req.params
    const listing_id = req.params.listing_id

    if (!listing_id) {
      const error = new Error("Listing_id could not be found");
      error.status = 404;
      error.type = "http://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

    //TODO: Add error when listing_id does not match any existing listing

    // Call service to get amenities by listing_id
    const data = await getAmenitiesByListingService(listing_id);

    // Success response
    res.status(200).json({data});

  } catch (err) {
    // Pass error to middleware
    next(err)
  }
}

/// /
// Get amenity by id
/// /
export const getAmenityById = async (req, res, next) => {
  try {
    // Get amenity id
    const { amenity_id } = req.params;

    // Call service to fetch amenity by id
    const amenity = await getAmenityByIdService(amenity_id);
    
    // If no amenity is found, return error
    if (!amenity) {
      const error = new Error("Amenity could not be found");
      error.status = 404;
      error.type = "http://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

    // Success response
    handleResponse(res, 200, "Amenity fetched successfully", amenity);

  } catch (err) {
    
    //Pass error to errorHandler
    next(err);

  }
}

/// /
// Delete amenity
/// /
export const deleteAmenity = async (req, res, next) => {
  try {
    // Get amenity id
    const { amenity_id } = req.params;

    // Call service to delete amenity
    const deletedAmenity = await deleteAmenityService(amenity_id);

    // If no amenity is found, return error
    if (!deletedAmenity) {
      const error = new Error("Amenity could not be found");
      error.status = 404;
      error.type = "http://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

    // Success response
    handleResponse(res, 200, "Amenity deleted successfully", deleteAmenity);

  } catch (err) {

    //Pass error to errorHandler
    next(err);

  }
}