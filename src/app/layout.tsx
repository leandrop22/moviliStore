import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "<MoviliStore>",
  description: "Compra y venta celulares nuevos y usados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
