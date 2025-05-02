"use client";
import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";

import dynamic from "next/dynamic";

// Evita el SSR que rompe Leaflet
const LocationPicker = dynamic(() => import("../components/LocationPicker"), {
  ssr: false,
});
import PhoneCard from "../components/PhoneCard";
import { phone } from "../types/Publicacion";
import { getAllPublicaciones } from "../services/publicacionesService";
import { getDistance } from "../utils/distance";
import UbicacionBoton from "@/components/UbicacionBoton";

export default function HomePage() {
  const [phones, setPhones] = useState<phone[]>([]);
  const [center, setCenter] = useState<{ lat: number; lon: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState(10);
  const [filtro, setFiltro] = useState("");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    getAllPublicaciones().then(setPhones);
  }, []);

  const filtered = phones.filter(p => {
    const textMatch =
      p.marca.toLowerCase().includes(filtro.toLowerCase()) ||
      p.modelo.toLowerCase().includes(filtro.toLowerCase());
    if (!center) return textMatch;
    const dist = getDistance(center.lat, center.lon, p.lat, p.lon);
    return textMatch && dist <= radiusKm;
  });

  return (
    <>
          <main className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        <aside>
          <SearchBar onSearch={setFiltro} />
          <UbicacionBoton
            locationText={center ? `${center.lat.toFixed(2)},${center.lon.toFixed(2)}` : "Elegí ubicación"}
            radiusKm={radiusKm}
            onClick={() => setShowMap(!showMap)}
          />
          <label className="radius-control">
            Rango: {radiusKm} km
            <input
              type="range"
              min={1}
              max={50}
              value={radiusKm}
              onChange={e => setRadiusKm(+e.target.value)}
            />
          </label>
          {showMap && (
            <LocationPicker
            radiusKm={radiusKm}
            onLocationChange={(lat: number, lon: number) => setCenter({ lat, lon })}
          />

          )}
        </aside>

        <section>
          <div className="grid">
            {filtered.map(p => (
              <PhoneCard key={p.id} phone={p} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
