"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";


import { Input } from "@/components/Input";
import { ProductList } from "@/components/ProductList";
import { Ventas } from "@/types/Ventas";
import { VentaList } from "../VentaList";


interface RegistroViewProps {
  ventas: Ventas[];
}

export function RegistroView({ ventas }: RegistroViewProps) {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState("");

  const [selectedVenta, setSelectedVenta] = useState<Ventas | null>(null);

  const [formData, setFormData] = useState<Ventas>({
    idVenta: 0,
    fecha: "",
    totalFinal: 0,
    nombreCliente: "",
    nombreEmpleado: "",
    nombreSucursal: "",
    detalles:[],
  });

  const ventasFiltradas = useMemo(() => {
    if (!busqueda.trim()) {
      return ventas;
    }

    const search = busqueda.toLowerCase();

    return ventas.filter(
      (venta) =>
        venta.nombreCliente.toLowerCase().includes(search) ||
        venta.idVenta.toString().includes(search),
    );
  }, [ventas, busqueda]);

  const handleSelectVenta = (venta: Ventas) => {
    setSelectedVenta(venta);

    setFormData(venta);
  };

  const handleNewVenta = () => {
    setSelectedVenta(null);

    setFormData({
      idVenta: 0,
      fecha: "",
      totalFinal: 0,
      nombreCliente: "",
      nombreEmpleado: "",
      nombreSucursal: "",
      detalles: [],
    });
  };

  const handleChange = (field: keyof Ventas, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "nombreCliente" ? value : Number(value),
    }));
  };

  return (
    <main className="flex h-full gap-6 p-6">
      {/* LISTA */}
      <section className="flex-1 rounded-3xl bg-[#0F1320] p-6">
        <div className="mb-4 flex items-center gap-4">
          <Input
            type="search"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <VentaList
            ventas={ventasFiltradas}
            selectedVenta={selectedVenta}
            onSelect={handleSelectVenta}
        />
      </section>

      {/* FORMULARIO */}
      <aside className="w-105 rounded-3xl bg-[#0F1320] p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
            {selectedVenta ? "Selecciona una Venta" : "Venta "+formData.fecha}
        </h2>

        <div className="space-y-4">
            <p> vendedor: {selectedVenta ? selectedVenta.nombreEmpleado : formData.nombreEmpleado}</p>
            <p> cliente: {selectedVenta ? selectedVenta.nombreCliente : formData.nombreCliente}</p>
            <p> sucursal: {selectedVenta ? selectedVenta.nombreSucursal : formData.nombreSucursal}</p>
            <p> total: {selectedVenta ? selectedVenta.totalFinal : formData.totalFinal}</p>
            <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-white">Detalles:</h3>
                {selectedVenta && selectedVenta.detalles.length > 0 ? (
                    <ul className="list-disc list-inside text-white">
                        {selectedVenta.detalles.map((detalle, index) => (
                            <li key={index}>
                                Producto: {detalle.nombreProducto}, Cantidad: {detalle.cantidad}, Precio Unitario: {detalle.subTotal/detalle.cantidad}, SubTotal: {detalle.subTotal}
                            </li>
                        ))}
                    </ul>
                ) : (   
                    <p className="text-white">No hay detalles disponibles.</p>
                )}
            </div>
        </div>
      </aside>
    </main>
  );
}
