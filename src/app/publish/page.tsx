"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublishPage() {
  const router = useRouter();
  const [phoneModel, setPhoneModel] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneModel || !price || !description) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(null);
    // Aquí guardarías la publicación en Firebase o en tu base de datos
    console.log("Publicando:", { phoneModel, price, description });

    router.push("/"); // Redirigir a Home después de publicar
  };

  return (
    <main className="publish">
      <form className="form" onSubmit={handlePublish}>
        <h2 className="form-title">Publicar Teléfono</h2>
        {error && <p className="form-error">{error}</p>}
        <input
          type="text"
          placeholder="Modelo del teléfono"
          className="form-input"
          value={phoneModel}
          onChange={(e) => setPhoneModel(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción del teléfono"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="form-button">
          Publicar
        </button>
      </form>
    </main>
  );
}
