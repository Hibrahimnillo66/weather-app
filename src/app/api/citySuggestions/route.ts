// filepath: /src/app/api/citySuggestions/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const fetchNewToken = async (): Promise<string> => {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Amadeus API credentials in environment variables.");
  }

  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken; // Return cached token if it's still valid
  }

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, expires_in } = response.data;
  cachedToken = access_token;
  tokenExpiry = Date.now() + expires_in * 1000; // Cache token expiry time
  return access_token;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const token = await fetchNewToken();
    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/cities",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          keyword: query,
          max: 10,
        },
      }
    );

    if (response.data.errors || !response.data.data) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = response.data.data.map((city: any) => ({
      name: city.name,
      country: city.address?.countryCode || "Unknown Country",
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return NextResponse.json({ error: "Failed to fetch city suggestions" }, { status: 500 });
  }
}