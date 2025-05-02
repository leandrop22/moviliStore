import { collection, getDocs, addDoc } from "firebase/firestore";

import { publicacionBase, publicacion } from "@/types/Publicacion";
import { db } from "./firebaseConfig";

/**
 * Obtiene todas las publicaciones desde Firestore.
 */
export async function getAllPublicaciones(): Promise<publicacion[]> {
  try {
    const colRef = collection(db, "publicaciones");
    const snapshot = await getDocs(colRef);

    const publicaciones: publicacion[] = snapshot.docs.map((doc) => {
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
    }).filter(Boolean) as publicacion[];

    return publicaciones;
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return [];
  }
}

/**
 * Crea una nueva publicación en Firestore.
 */
export async function createPublicacion(data: publicacionBase): Promise<void> {
  try {
    const colRef = collection(db, "publicaciones");
    await addDoc(colRef, data);
  } catch (error) {
    console.error("Error al crear publicación:", error);
    throw error;
  }
}

