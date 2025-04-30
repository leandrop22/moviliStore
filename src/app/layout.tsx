/*import "../styles/style.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "MoviliStore",
  description: "Compra y venta de celulares usados",
};

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}*/

"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">MoviliStore</Link>
        {/* Aquí podrías poner perfil o enlaces */}
      </div>
    </header>
  );
}

