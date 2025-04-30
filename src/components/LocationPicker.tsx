"use client";
import { MapContainer, TileLayer, Marker, useMapEvents, Circle, useMap } from "react-leaflet";
import { FC, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  iconAnchor: [12, 41],
  iconSize: [25, 41],
  shadowUrl: "/marker-shadow.png",
});

const radiusToZoom = (r: number) => {
  if (r <= 5) return 14;
  if (r <= 10) return 13;
  if (r <= 20) return 12;
  if (r <= 40) return 11;
  if (r <= 80) return 10;
  return 9;
};

interface Props {
  radiusKm: number;
  onLocationChange: (pos: { lat: number; lon: number }) => void;
}

const LocationPicker: FC<Props> = ({ radiusKm, onLocationChange }) => {
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);

  const MarkAndCircle = () => {
    const map = useMap();
    useMapEvents({
      click(e) {
        const newPos = { lat: e.latlng.lat, lon: e.latlng.lng };
        setPos(newPos);
        onLocationChange(newPos);
        map.setView([newPos.lat, newPos.lon], radiusToZoom(radiusKm));
      },
    });
    useEffect(() => {
      if (pos) map.setZoom(radiusToZoom(radiusKm));
    }, [radiusKm]);

    return pos ? (
      <>
        <Marker position={[pos.lat, pos.lon]} icon={markerIcon} />
        <Circle center={[pos.lat, pos.lon]} radius={radiusKm * 1000} />
      </>
    ) : null;
  };

  return (
    <MapContainer
      center={[-32.89, -68.84]}
      zoom={12}
      scrollWheelZoom
      className="leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MarkAndCircle />
    </MapContainer>
  );
};

export default LocationPicker;
