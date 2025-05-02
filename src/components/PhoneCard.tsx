"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/types/Publicacion";

export default function PhoneCard({ Phone }: { Phone: Phone}) {
  const src = Phone.fotoUrl || "/placeholder.png";

  return (
    <div className="card">
      <div className="card-image">
        <Image
          src={src}
          alt={Phone.modelo || "Teléfono"}
          width={200}
          height={200}
          className="card-img"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.png";
          }}
        />
      </div>
      <h2 className="card-title">
        {Phone.marca} {Phone.modelo}
      </h2>
      <p className="card-price">
        {Phone.precio !== undefined ? `$${Phone.precio}` : "Precio no disponible"}
      </p>
      <Link href={`/${Phone.id}`} className="card-button">
        Ver más
      </Link>
    </div>
  );
}
