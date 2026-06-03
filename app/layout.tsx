import { NavBar, NavItem } from "@/components/NavBar";
import "@/styles/globals.css";
import { Empleado } from "@/types/Empleado";
import { ShoppingCart, Package, BarChart3 } from "lucide-react";

const empleadoSession: Empleado = {
  id_empleado: 1,
  nombre_empleado: "Simon Vela",
  rol_empleado: "Administrador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>AbarrosPOS</title>
      </head>
      <body className="bg-[#050812] min-h-screen text-white">
        <header className="w-full">
          <NavBar title="Los Garcia" session={empleadoSession}>
            <NavItem
              text="POS"
              icon={<ShoppingCart size={18} />}
              route="/"
            />

            <NavItem
              text="Almacén"
              icon={<Package size={18} />}
              route="/almacen"
            />

            <NavItem
              text="Reportes"
              icon={<BarChart3 size={18} />}
              route="/reportes"
            />
          </NavBar>
        </header>{children}
      </body>
    </html>
  );
}
