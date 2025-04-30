"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/types/Phone";

export default function PhoneCard({ phone }: { phone: Phone }) {
  const src = phone.fotoUrl || "/placeholder.png";

  return (
    <div className="card">
      <div className="card-image">
        <Image
          src={src}
          alt={phone.modelo}
          width={200}
          height={200}
          className="card-img"
        />
      </div>
      <h2 className="card-title">
        {phone.marca} {phone.modelo}
      </h2>
      <p className="card-price">${phone.precio}</p>
      <Link href={`/${phone.id}`} className="card-button">
        Ver más
      </Link>
    </div>
  );
}
