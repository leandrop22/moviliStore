"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentLocation } from "@/utils/geolocation";
import { createPublicacion } from "@/services/publicacionesService";
import { PublicacionBase } from "@/types/Publicacion";

export default function CreatePage() {
  const router = useRouter();
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Intentando obtener ubicación...");
      const loc = await getCurrentLocation();
      console.log("Ubicación:", loc);
  
      const newPhone: PublicacionBase = {
        modelo,
        marca,
        precio: parseFloat(precio),
        descripcion: desc,
        lat: loc.lat,
        lon: loc.lon,
        fotoUrl: "",
      };
  
      console.log("Creando publicación...", newPhone);
      await createPublicacion(newPhone);
      console.log("Publicación creada. Redirigiendo...");
      router.push("/");
  
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      setErr(message);
      console.error("Error al publicar:", message);
    }
  };
  
 

  return (
    <main className="create ">
      <form className="form" onSubmit={handle}>
        <h2 className="form-title">Publicar Teléfono</h2>
        {err && <p className="form-error">{err}</p>}
        <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} className="form-input" required />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="form-input" min="0" required />
        <textarea placeholder="Descripción" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-input" required />
        <button type="submit" className="form-button">Publicar</button>
      </form>
    </main>
  );
}
