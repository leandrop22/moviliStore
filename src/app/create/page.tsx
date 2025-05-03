"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentLocation } from "@/utils/geolocation";
import { createPublicacion } from "@/services/publicacionesService";
import { PublicacionBase } from "@/types/Publicacion";
import { storage } from "@/services/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function CreatePage() {
  const router = useRouter();
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando formulario..."); 
    setErr(null);
    setLoading(true);

    try {
      // Obtener ubicación
      const loc = await getCurrentLocation();

      // Subir imagen si hay archivo
      let fotoUrl = "";
      if (file) {
        const storageRef = ref(storage, `imagenes/${Date.now()}_${file.name}`);
        if (!file) {
          setErr("Debes subir una imagen");
          setLoading(false);
          return;
        }        
        await uploadBytes(storageRef, file);
        fotoUrl = await getDownloadURL(storageRef);
      }

      // Crear objeto de publicación
      const newPhone: PublicacionBase = {
        modelo,
        marca,
        precio: parseFloat(precio),
        descripcion: desc,
        lat: loc.lat,
        lon: loc.lon,
        fotoUrl,
      };

      // Enviar a la base de datos
      await createPublicacion(newPhone);
      router.push("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      setErr(message);
      console.error("Error al publicar:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create">
      <form className="form" onSubmit={handle}>
        <h2 className="form-title">Publicar Teléfono</h2>
        {err && <p className="form-error">{err}</p>}

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="form-input"
          min="0"
          required
        />
        <textarea
          placeholder="Descripción"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="form-input"
          required
        />
        <label
            className="form-dropzone"
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setFile(e.dataTransfer.files[0]);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{file ? file.name : "Arrastrá una imagen o hacé clic para elegir"}</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
        </label>


        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </main>
  );
  
}
console.log("CreatePage cargado")
