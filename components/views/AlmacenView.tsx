"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createProducto,
  deleteProducto,
  updateProducto,
} from "@/actions/productos";

import { Input } from "@/components/Input";
import { ProductList } from "@/components/ProductList";

import { Producto } from "@/types/Productos";

interface AlmacenViewProps {
  productos: Producto[];
}

export function AlmacenView({ productos }: AlmacenViewProps) {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const [formData, setFormData] = useState<Producto>({
    idProducto: 0,
    nombreProducto: "",
    costo: 0,
    precioUnitario: 0,
    precioPieza: 0,
    precioPaquete: 0,
    activo: true,
    idProveedor: 0,
  });

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) {
      return productos;
    }

    const search = busqueda.toLowerCase();

    return productos.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(search) ||
        producto.idProducto.toString().includes(search),
    );
  }, [productos, busqueda]);

  const handleSelectProduct = (producto: Producto) => {
    setSelectedProduct(producto);

    setFormData(producto);
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);

    setFormData({
      idProducto: 0,
      nombreProducto: "",
      costo: 0,
      precioUnitario: 0,
      precioPieza: 0,
      precioPaquete: 0,
      activo: true,
      idProveedor: 0,
    });
  };

  const handleChange = (field: keyof Producto, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "nombreProducto" ? value : Number(value),
    }));
  };

  const handleSave = async () => {
    const success = await createProducto({
      nombreProducto: formData.nombreProducto,
      costo: formData.costo,
      precioUnitario: formData.precioUnitario,
      precioPieza: formData.precioPieza,
      precioPaquete: formData.precioPaquete,
      activo: formData.activo,
      idProveedor: formData.idProveedor,
    });

    if (!success) {
      console.error("No se pudo crear el producto");
      return;
    }

    handleNewProduct();

    router.refresh();
  };

  const handleUpdate = async () => {
    const success = await updateProducto(formData);

    if (!success) {
      console.error("No se pudo actualizar el producto");
      return;
    }

    router.refresh();
  };

  const handleDelete = async () => {
    const success = await deleteProducto(formData.idProducto);

    if (!success) {
      console.error("No se pudo eliminar el producto");
      return;
    }

    handleNewProduct();

    router.refresh();
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

          <button
            onClick={handleNewProduct}
            className="
              rounded-2xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              transition-colors
              hover:bg-blue-500
            "
          >
            Nuevo
          </button>
        </div>

        <ProductList
          productos={productosFiltrados}
          selectedProduct={selectedProduct}
          onSelect={handleSelectProduct}
        />
      </section>

      {/* FORMULARIO */}
      <aside className="w-105 rounded-3xl bg-[#0F1320] p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <div className="space-y-4">
          <Input
            label="Código de barras"
            type="number"
            value={formData.idProducto}
            onChange={(e) => handleChange("idProducto", e.target.value)}
          />

          <Input
            label="Nombre"
            value={formData.nombreProducto}
            onChange={(e) => handleChange("nombreProducto", e.target.value)}
          />

          <Input
            label="Proveedor"
            type="number"
            value={formData.idProveedor}
            onChange={(e) => handleChange("idProveedor", e.target.value)}
          />

          <Input
            label="Costo"
            type="number"
            step="0.01"
            value={formData.costo}
            onChange={(e) => handleChange("costo", e.target.value)}
          />

          <Input
            label="Precio"
            type="number"
            step="0.01"
            value={formData.precioUnitario}
            onChange={(e) => handleChange("precioUnitario", e.target.value)}
          />
        </div>

        <div className="mt-8 space-y-3">
          {selectedProduct ? (
            <>
              <button
                onClick={handleUpdate}
                className="
                  w-full
                  rounded-2xl
                  bg-blue-600
                  py-3
                  font-medium
                  text-white
                  transition-colors
                  hover:bg-blue-500
                "
              >
                Actualizar Producto
              </button>

              <button
                onClick={handleDelete}
                className="
                  w-full
                  rounded-2xl
                  bg-red-600
                  py-3
                  font-medium
                  text-white
                  transition-colors
                  hover:bg-red-500
                "
              >
                Eliminar Producto
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className="
                w-full
                rounded-2xl
                bg-blue-600
                py-3
                font-medium
                text-white
                transition-colors
                hover:bg-blue-500
              "
            >
              Guardar Producto
            </button>
          )}
        </div>
      </aside>
    </main>
  );
}
