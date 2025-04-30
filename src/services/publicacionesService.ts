import { db } from "../services/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Phone } from "../types/Phone";

export async function getAllPublicaciones(): Promise<Phone[]> {
  const snap = await getDocs(collection(db, "publicaciones"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Phone));
}

export async function createPublicacion(data: Phone) {
  await addDoc(collection(db, "publicaciones"), data);
}
