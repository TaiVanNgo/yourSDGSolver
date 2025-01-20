import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function GoogleMap({ coordinates }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Use Vite's environment variable
          version: "weekly",
        });

        const { Map } = await loader.importLibrary("maps");

        const [lat, lng] = coordinates
          .split(",")
          .map((coord) => parseFloat(coord.trim()));

        const mapOptions = {
          center: { lat, lng },
          zoom: 12,
        };

        const map = new Map(mapRef.current, mapOptions);

        new google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
}
