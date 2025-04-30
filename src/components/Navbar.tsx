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
          <Link href="/register" className="navbar-link">Register</Link>
          <Link href="/publish" className="navbar-link">Publish</Link>
        </div>
      </div>
    </nav> 
  );
}
