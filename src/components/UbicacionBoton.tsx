"use client";
import { FC } from "react";
import { MapPin } from "lucide-react";

interface Props {
  locationText: string;
  radiusKm: number;
  onClick: () => void;
}

const UbicacionBoton: FC<Props> = ({ locationText, radiusKm, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
    className="ubic-btn flex items-center gap-2 cursor-pointer"
    aria-label={`Ubicación actual: ${locationText}, radio: ${radiusKm} kilómetros`}
  >
    <MapPin className="w-5 h-5" />
    {locationText} · {radiusKm} km
  </div>
);

export default UbicacionBoton;
