"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const myIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
});


interface Props {
  radiusKm: number;
  onLocationChange: (lat: number, lon: number) => void;
}

export default function LocationPicker({ radiusKm, onLocationChange }: Props) {
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);
  const map = useMap();

  useEffect(() => {
    if (pos) {
      map.setView([pos.lat, pos.lon], radiusToZoom(radiusKm));
    }
  }, [radiusKm, pos, map]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPos({ lat, lon });
        onLocationChange(lat, lon);
      },
    });

    return pos ? <Marker position={[pos.lat, pos.lon]} icon={myIcon} /> : null;
  }

  return (
    <MapContainer center={[-32.89, -68.84]} zoom={13} className="leaflet-container">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {pos && (
        <Circle
          center={[pos.lat, pos.lon]}
          radius={radiusKm * 1000}
        />
      )}
    </MapContainer>
  );
}

function radiusToZoom(km: number): number {
  if (km < 5) return 14;
  if (km < 10) return 13;
  if (km < 20) return 12;
  if (km < 50) return 11;
  return 10;
}
