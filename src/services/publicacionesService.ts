// src/services/publicacionesService.ts

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getDatabase, ref, push } from "firebase/database";
import { PublicacionBase, Publicacion } from "@/types/Publicacion";
import { app } from "@/services/firebaseConfig"; // asegúrate de exportar `app` desde firebaseConfig

/**
 * Obtiene todas las publicaciones desde Firestore.
 */
export async function getAllPublicaciones(): Promise<Publicacion[]> {
  try {
    const db = getFirestore(app); // 💡 usar Firestore
    const colRef = collection(db, "publicaciones");
    const snapshot = await getDocs(colRef);

    const publicaciones: Publicacion[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      if (
        typeof data.marca !== "string" ||
        typeof data.modelo !== "string" ||
        typeof data.precio !== "number" ||
        typeof data.lat !== "number" ||
        typeof data.lon !== "number"
      ) {
        console.warn("Publicación con datos inválidos ignorada:", doc.id);
        return null;
      }

      return {
        id: doc.id,
        marca: data.marca,
        modelo: data.modelo,
        precio: data.precio,
        descripcion: data.descripcion ?? "",
        fotoUrl: data.fotoUrl ?? null,
        lat: data.lat,
        lon: data.lon,
      };
    }).filter(Boolean) as Publicacion[];

    return publicaciones;
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return [];
  }
}

/**
 * Crea una nueva publicación en Realtime Database.
 */
export async function createPublicacion(data: PublicacionBase): Promise<void> {
  try {
    const db = getDatabase(app); // 💡 usar Realtime Database
    const publicacionesRef = ref(db, "publicaciones");
    await push(publicacionesRef, data);
  } catch (error) {
    console.error("Error al crear publicación:", error);
    throw error;
  }
}
