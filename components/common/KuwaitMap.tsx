import React, { memo, useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

interface KuwaitMapProps {
  // Optional props to customize the map
  center?: [number, number]; // [longitude, latitude]
  zoom?: number;
  onMapLoad?: (view: unknown) => void;
}

const KuwaitMap: React.FC<KuwaitMapProps> = ({
  center = [47.937847, 29.253186], // Default center of Kuwait
  zoom = 10,
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapViewRef = useRef<null | unknown>(null);
  // 1|IYPmYHI6LhRc1J5l47ITzDXzu7gYkGzYnCcmKacQ9a704ee7
  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !mapViewRef.current) {
      loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/VectorTileLayer",
      ])
        .then(([Map, MapView, VectorTileLayer]) => {
          // Create the basemap vector tile layer
          const basemapLayer = new VectorTileLayer({
            url: "https://kuwaitportal.paci.gov.kw/arcgis/sharing/rest/content/items/071bfc3561d44e81828ada6aa0a5a565/resources/styles/root.json",
          });

          // Create the reference vector tile layer
          const referenceLayer = new VectorTileLayer({
            url: "https://kuwaitportal.paci.gov.kw/arcgis/sharing/rest/content/items/2f33117e3b5644d1a95ce940f38cae04/resources/styles/root.json",
          });

          // Create the map with the vector tile layers
          const map = new Map({
            basemap: "arcgis/navigation",
            layers: [basemapLayer, referenceLayer],
          });

          // Create the map view
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: center,
            zoom: zoom,
          });

          // Save reference to the map view
          mapViewRef.current = view;

          // Call the onMapLoad callback if provided
          if (onMapLoad) {
            view.when(() => {
              onMapLoad(view);
            });
          }
        })
        .catch((err) => {
          console.error("Error loading ArcGIS modules:", err);
        });
    }

    // Cleanup function
    return () => {
      if (mapViewRef.current) {
        // @ts-expect-error mapViewRef.current is of type unknown
        mapViewRef.current.destroy();
        mapViewRef.current = null;
      }
    };
  }, [center, zoom, onMapLoad]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default memo(KuwaitMap);
