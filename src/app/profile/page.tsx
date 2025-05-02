"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) return <p className="loading">Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Mi Perfil</h1>
      <p><strong>Nombre:</strong> {user.displayName || "No definido"}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Acá más adelante podés agregar: publicaciones activas, vendidas, etc. */}
    </div>
  );
}
