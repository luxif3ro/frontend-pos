"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/Input";
import { ProductCard } from "@/components/ProductCard";
import { Producto } from "@/types/Productos";
import { Ventas, VentasPOST } from "@/types/Ventas";
import { createVenta } from "@/actions/ventas";

interface PosViewProps {
  productos: Producto[];
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export function PosView({ productos }: PosViewProps) {
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) {
      return productos;
    }

    return productos.filter((producto) =>
      producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [busqueda, productos]);

  const agregarProducto = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.producto.idProducto === producto.idProducto,
      );

      if (existe) {
        return prev.map((item) =>
          item.producto.idProducto === producto.idProducto
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          producto,
          cantidad: 1,
        },
      ];
    });
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.producto.precioUnitario * item.cantidad,
    0,
  );

  const handleAgregarVenta = async (carritoItems: ItemCarrito[]) => {
    const venta: VentasPOST = {
      idCliente: 1,
      idEmpleado: 1,
      idSucursal: 1,
      productos: carritoItems.map((item) => ({
        idProducto: item.producto.idProducto,
        cantidad: item.cantidad,
      })),
    };

    const success = await createVenta(venta);
    if (success) {
      setCarrito([]);
    }
  };

  return (
    <main className="flex h-full gap-6 p-6">
      {/* Productos */}
      <section className="flex-1 rounded-3xl bg-[#0F1320] p-6">
        <Input
          type="search"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {productosFiltrados.length === 0 ? (
          <div className="mt-10 flex justify-center">
            <p className="text-gray-400">No hay productos</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.idProducto}
                producto={producto}
                onAdd={agregarProducto}
              />
            ))}
          </div>
        )}
      </section>

      {/* Carrito */}
      <aside className="w-96 rounded-3xl bg-[#0F1320] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Venta Actual</h2>

        {carrito.length === 0 ? (
          <p className="text-gray-400">No hay productos agregados</p>
        ) : (
          <div className="space-y-2">
            {carrito.map((item) => (
              <div
                key={item.producto.idProducto+"carrito"}
                className="flex justify-between rounded-xl bg-[#161B2C] p-3"
              >
                <div>
                  <p>{item.producto.nombreProducto}</p>

                  <p className="text-sm text-gray-400">
                    Cantidad: {item.cantidad}
                  </p>
                </div>

                <span>
                  ${(item.producto.precioUnitario * item.cantidad).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-t border-[#2B3145] pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="
              mt-4
              w-full
              rounded-xl
              bg-blue-600
              py-3
              font-medium
              text-white
              transition-colors
              hover:bg-blue-500
            "
            onClick={() => handleAgregarVenta(carrito)}
          >
            Confirmar Venta
          </button>
        </div>
      </aside>
    </main>
  );
}
