import pool from "../../config/db.js"


/// /
// Create new listing service
/// /
export const createListingService = async (host_id, title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds, amenities, images = []) => {
  // Start transaction
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Execute SQL query to insert values to listings table
    const result = await client.query(
      "INSERT INTO listings (host_id, title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *;",
      [host_id, title, description, address, city, country, price_per_night, max_adults, max_children, max_infants, max_pets, num_bedrooms, num_bathrooms, num_beds, images]
    );

    const newListing = result.rows[0];

    // Insert amenities if providied
    if (amenities.length > 0) {
      const amenityValues = amenities.map((aId) => `(${newListing.listing_id}, ${aId})`).join(",");
      await client.query(
        `INSERT INTO listing_amenities (listing_id, amenity_id) 
        SELECT $1, UNNEST ($2::int[]);`,

        [newListing.listing_id, amenities]
      );
    }

    // Commit transaction
    await client.query("COMMIT");

    return newListing;
    
  } catch (err) {

    await client.query("ROLLBACK");
    throw err;

  } finally {

    client.release();
  }
}

/// /
// Get all listings service
/// /
export const getAllListingsService = async () => {
  // Execute SQL query to select all listings from "listings" table
  const result = await pool.query("SELECT * FROM listings");
  // Return array
  return result.rows;
};

/// / 
// Get listing by id service
/// /
export const getListingByIdService = async (listing_id) => {
  // Execute SQL query to find listing by listing_id
  const result = await pool.query("SELECT * FROM listings WHERE listing_id = $1", [listing_id]);
  // Return listing
  return result.rows[0];
};

/// / 
// Delete listing service
/// /
export const deleteListingService = async (listing_id, host_id) => {
  // Chheck if listing exists
  const listing = await pool.query(
    "SELECT * FROM listings WHERE listing_id = $1 AND host_id = $2",
    [listing_id, host_id]
  );

  // If no listing exists return null
  if (listing.rows.length === 0) {
    return null; 
  }

  // If it exists, delete it
  await pool.query("DELETE FROM listings WHERE listing_id = $1", [listing_id]);

  // Return deleted listing
  return listing.rows[0];
};