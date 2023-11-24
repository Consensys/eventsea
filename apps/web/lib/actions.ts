import { LatLng } from "use-places-autocomplete";

export const getAddressFromCoordinates = async ({ lat, lng }: LatLng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  
      const response = await fetch(url);
      const data = await response.json();
      return data.results[0].formatted_address.split(",")[0];
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };