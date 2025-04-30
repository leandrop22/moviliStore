

import Link from "next/link";

// Simulación de sesión (podés reemplazarlo por un hook real como useSession de next-auth)
const isLoggedIn = false;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          📱 MoviliStore
        </Link>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <Link href="/publish" className="navbar-link">Publicar</Link>
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
