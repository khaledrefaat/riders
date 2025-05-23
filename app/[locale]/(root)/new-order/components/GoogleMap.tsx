"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  lat: number;
  lng: number;
  onPinChange: (lat: number, lng: number) => void;
  apiKey: string;
}

declare global {
  interface Window {
    google: unknown;
    initMap: () => void;
  }
}

export default function GoogleMap({
  lat,
  lng,
  onPinChange,
  apiKey,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<unknown>(null);
  const [marker, setMarker] = useState<unknown>(null);

  // Ensure lat and lng are valid numbers
  const validLat = typeof lat === "number" && isFinite(lat) ? lat : 0;
  const validLng = typeof lng === "number" && isFinite(lng) ? lng : 0;

  useEffect(() => {
    // Check if Google Maps is already loaded
    // @ts-expect-error type error
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if API key is provided
    if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
      console.error("Google Maps API key is missing or invalid");
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      setIsLoaded(true);
    };
    script.onerror = (error) => {
      console.error("Failed to load Google Maps API:", error);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    try {
      // Initialize map
      // @ts-expect-error type error
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: validLat, lng: validLng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      // Create draggable marker
      // @ts-expect-error type error
      const markerInstance = new window.google.maps.Marker({
        position: { lat: validLat, lng: validLng },
        map: mapInstance,
        draggable: true,
        title: "Drag me to select location",
      });

      // Add dragend event listener
      markerInstance.addListener("dragend", () => {
        const position = markerInstance.getPosition();
        const newLat = position.lat();
        const newLng = position.lng();
        onPinChange(newLat, newLng);
      });

      // Add click event listener to map
      mapInstance.addListener("click", (event: unknown) => {
        // @ts-expect-error type error
        const newLat = event.latLng.lat();
        // @ts-expect-error type error
        const newLng = event.latLng.lng();
        markerInstance.setPosition({ lat: newLat, lng: newLng });
        onPinChange(newLat, newLng);
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      console.log("Google Maps initialized successfully");
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }
  }, [isLoaded, validLat, validLng, onPinChange]);

  // Update marker position when props change
  useEffect(() => {
    if (
      marker &&
      map &&
      typeof validLat === "number" &&
      typeof validLng === "number"
    ) {
      const newPosition = { lat: validLat, lng: validLng };
      // @ts-expect-error type error
      marker.setPosition(newPosition);
      // @ts-expect-error type error
      map.setCenter(newPosition);
    }
  }, [validLat, validLng, marker, map]);

  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
    return (
      <div
        className="flex items-center justify-center bg-red-50 border border-red-200 rounded-lg"
        style={{ width: "470px", height: "220px" }}
      >
        <div className="text-red-600 text-center px-4">
          <p className="font-semibold">Google Maps API Key Required</p>
          <p className="text-sm">Please provide a valid API key</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg border"
        style={{ width: "470px", height: "220px" }}
      >
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="rounded-lg border overflow-hidden"
      style={{ width: "100%", height: "220px" }}
    />
  );
}
