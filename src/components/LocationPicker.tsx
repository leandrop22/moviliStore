"use client";

import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
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
    const map = useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPos({ lat, lon });
        onLocationChange(lat, lon);
        map.setView([lat, lon], radiusToZoom(radiusKm));
      },
    });

    return pos ? <Marker position={[pos.lat, pos.lon]} icon={markerIcon} /> : null;
  }

  function ZoomUpdater() {
    const map = useMap();

    useEffect(() => {
        if (pos) {
          map.setZoom(radiusToZoom(radiusKm));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [radiusKm, pos]);
      

    return null;
  }

  return (
    <MapContainer
      center={[-32.89, -68.84]}
      zoom={radiusToZoom(radiusKm)}
      className="leaflet-container"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <ZoomUpdater />
      {pos && <Circle center={[pos.lat, pos.lon]} radius={radiusKm * 1000} />}
    </MapContainer>
  );
}

function radiusToZoom(km: number): number {
  if (km <= 2) return 14;
  if (km <= 5) return 13;
  if (km <= 10) return 12;
  if (km <= 20) return 11;
  if (km <= 40) return 10;
  return 9;
}
