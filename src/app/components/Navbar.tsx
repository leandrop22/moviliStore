"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          📱 MoviliStore
        </Link>
        <div className="navbar-links">
          <Link href="/login" className="navbar-link">Login</Link>
          <Link href="/register" className="navbar-link">Registro</Link>
          <Link href="/publish" className="navbar-link">Publicar</Link>
        </div>
      </div>
    </nav> 
  );
}
