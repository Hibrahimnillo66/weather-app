import axios from "axios";

const fetchCitySuggestions = async (query: string): Promise<{ name: string; country: string }[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/cities",
      {
        headers: {
          Authorization: `Bearer Djx2C4UUhfXDxUW6VJOcvurWfSWC`,
        },
        params: {
          keyword: query,
          max: 10, // Limit the number of results
        },
      }
    );

    // Check for errors in the response
    if (response.data.errors || !response.data.data) {
      console.warn("No data found for query:", query);
      return [];
    }

    // Map the cities if data exists
    return response.data.data.map((city: any) => ({
      name: city.name,
      country: city.address?.countryCode || "Unknown Country",
    }));
  } catch (error) {
    // Handle network or API errors gracefully
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Error Setting Up Request:", error.message);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    return [];
  }
};