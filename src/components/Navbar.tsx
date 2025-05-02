"use client";

import { onUserStateChange } from "@/services/authService";
import { getAuth, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✔ CORRECTO en App Router
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onUserStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push("/");
    });
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          📱 MoviliStore
        </Link>
        {!loading && (
          <div className="navbar-links">
            {user ? (
              <>
                <Link href="/create" className="navbar-link">Nueva publicación</Link>
                <Link href="/profile" className="navbar-link">Mi Perfil</Link>
                <button onClick={handleLogout} className="navbar-link btn-logout">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" className="navbar-link">Login</Link>
                <Link href="/register" className="navbar-link">Registrarse</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
