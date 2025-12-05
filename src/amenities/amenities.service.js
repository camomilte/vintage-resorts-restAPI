import pool from "../../config/db.js";

/// /
// Create new amenity service
/// /
export const createAmenityService = async (amenity_name, description) => {

  // Execute SQL query to insert values to 'amenities' table
  const result =  await pool.query(
    "INSERT INTO amenities (amenity_name, description) VALUES ($1, $2) RETURNING *;",
    [amenity_name, description]
  );

  // Return created amenity
  return result.rows[0];

};

/// /
// Get all amenities (except eras) service
/// /
export const getAllAmenitiesService = async () => {
  // Execute SQL query to select all amenities except where description is Era
  const result = await pool.query("SELECT * FROM amenities WHERE description IS NULL OR description <> 'Era';");
  // Return array
  return result.rows;
};

/// /
// Get all eras service
/// /
export const getAllErasService = async () => {
  // Execute SQL query to select all eras
  const result = await pool.query("SELECT * FROM amenities WHERE description = 'Era';");
  // Return array
  return result.rows;
};

/// /
// Get all amenities from listing service
/// /
export const getAmenitiesByListingService = async (listing_id) => {
  // Execute SQL query
  const result = await pool.query(
    "SELECT a.* FROM amenities a JOIN listing_amenities la ON la.amenity_id = a.amenity_id WHERE la.listing_id = $1;",
    [listing_id]
  );
  // Return array
  return result.rows;
}

/// /
// Get amenity by id service
/// /
export const getAmenityByIdService = async (amenity_id) => {
  // Execute SQL query to select all amenity by amenity_id
  const result = await pool.query(
    "SELECT * FROM amenities WHERE amenity_id = $1;",
    [amenity_id]
  );
  // Return array
  return result.rows[0];
};

/// /
// Delete amenity
/// /
export const deleteAmenityService = async (amenity_id) => {
  // Execute SQL query to delete amenity from 'amenities' table by amentiy_id
  const result = await pool.query(
    "DELETE FROM amenities WHERE amenity_id = $1 RETURNING *;",
    [amenity_id]
  );
  // Return deleted amenity
  return result.rows[0];
};