"use client";
import { FC } from "react";
import { MapPin } from "lucide-react";

interface Props {
  locationText: string;
  radiusKm: number;
  onClick: () => void;
}

const UbicacionBoton: FC<Props> = ({ locationText, radiusKm, onClick }) => (
  <div onClick={onClick} className="ubic-btn">
    <MapPin className="w-5 h-5" />
    {locationText} · {radiusKm} km
  </div>
);

export default UbicacionBoton;
