

import { onUserStateChange } from "@/services/authService";
import { User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

// Simulación de sesión (podés reemplazarlo por un hook real como useSession de next-auth)
const isLoggedIn = false;

export default function Navbar() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onUserStateChange(setUser);
    return () => unsubscribe();
  }, []);
  
  return
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            📱 MoviliStore
          </Link>
          <div className="navbar-links">
            {isLoggedIn ? (
              <>
                {user && (
                  <Link href="/create" className="nav-link">
                   Nueva publicación
                  </Link>
                )}
            
                <Link href="/profile" className="navbar-link">Mi Perfil</Link>
                <Link href="/logout" className="navbar-link">Cerrar sesión</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="navbar-link">Login</Link>
                <Link href="/register" className="navbar-link">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );



} 
