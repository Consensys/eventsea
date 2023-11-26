"use client";

import {
  GoogleMap,
  Libraries,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { FC, useEffect, useMemo, useState } from "react";
import { getDetails } from "use-places-autocomplete";
import LocationIcon from "@/components/icons/LocationIcon";

interface EventLocationMapProps {
  location: string;
}

const EventLocationMap: FC<EventLocationMapProps> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [address, setAddress] = useState("");

  const libraries: Libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    const getAddress = async () => {
      if (isLoaded) {
        const details = (await getDetails({
          placeId: location,
          fields: ["name", "geometry.location"],
        })) as google.maps.places.PlaceResult;

        setCoordinates({
          lat: details.geometry?.location?.lat() || 0,
          lng: details.geometry?.location?.lng() || 0,
        });

        setAddress(details.name || "");
      }
    };
    getAddress();
  }, [location, isLoaded]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex gap-4 px-5 py-6 bg-white border-t border-l border-r rounded-ss-xl rounded-se-xl">
        <LocationIcon className="w-8 h-8" />
        <p className="text-gray-900">{address}</p>
      </div>
      <div className="w-full h-[300px]">
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={coordinates}
          mapContainerClassName="w-full h-full"
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default EventLocationMap;
