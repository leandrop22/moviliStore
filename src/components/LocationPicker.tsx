"use client";

import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  radiusKm: number;
  onLocationChange: (lat: number, lon: number) => void;
}

export default function LocationPicker({ radiusKm, onLocationChange }: Props) {
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPos({ lat, lon });
        onLocationChange(lat, lon);
      },
    });

    return pos ? <Marker position={[pos.lat, pos.lon]} icon={markerIcon} /> : null;
  }

  return (
    <MapContainer
      center={[-32.89, -68.84]}
      zoom={13}
      className="leaflet-container"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {pos && <Circle center={[pos.lat, pos.lon]} radius={radiusKm * 1000} />}
    </MapContainer>
  );
}
