"use client";

import { getAddressFromCoordinates } from "@/lib/actions";
import LocationIcon from "@/components/icons/LocationIcon";
import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import { FC, useEffect, useMemo, useState } from "react";
import { LatLng } from "use-places-autocomplete";

interface EventLocationMapProps {
  location: LatLng;
}

const EventLocationMap: FC<EventLocationMapProps> = ({ location }) => {
  const center = useMemo(() => location, []);
  const libraries: Libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const getAddress = async () => {
      const address = await getAddressFromCoordinates(location);
      setAddress(address);
    };
    getAddress();
  }, [location]);

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
          center={center}
          mapContainerClassName="w-full h-full"
        />
      </div>
    </div>
  );
};

export default EventLocationMap;
