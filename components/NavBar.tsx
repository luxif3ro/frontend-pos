import { Empleado } from "@/types/Empleado";
import Link from "next/link";
import React from "react";

interface NavBarProps {
  title: string;
  children?: React.ReactNode;
  session?: Empleado;
}

export function NavBar({ title, children, session }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#090b14] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-blue-300">{title}</h1>
      </div>

      {/* Menú */}
      <div className="flex items-center gap-3">{children}</div>

      {/* Usuario */}
      {session && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Caja 1</p>
            <p className="font-medium">{session.nombre_empleado}</p>
          </div>

          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-blue-200 font-bold">
            {session.nombre_empleado
              ?.split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavItemProps {
  text: string;
  icon?: React.ReactNode;
  route?: string;
  active?: boolean;
}

export function NavItem({ text, icon, route, active = false }: NavItemProps) {
  return (
    <Link
      href={route ?? "#"}
      className={`
        flex items-center gap-2
        px-8 py-3
        rounded-2xl
        border
        transition-all duration-200
        ${
          active
            ? "border-blue-500 bg-blue-900/30 text-blue-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            : "border-gray-800 bg-[#121624] text-gray-300 hover:border-blue-700 hover:text-blue-300"
        }
      `}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
}
