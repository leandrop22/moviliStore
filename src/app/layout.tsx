import "../styles/style.css";
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
}