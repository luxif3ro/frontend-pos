import { Producto } from "@/types/Productos";

interface ProductListProps {
  productos: Producto[];
  selectedProduct?: Producto | null;
  onSelect?: (producto: Producto) => void;
}

export function ProductList({
  productos,
  selectedProduct,
  onSelect,
}: ProductListProps) {
  if (productos.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-[#2B3145] bg-[#0F1320]">
        <p className="text-gray-400">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden   bg-[#0F1320]">
      {productos.map((producto) => {
        const isSelected =
          selectedProduct?.idProducto === producto.idProducto;

        return (
          <button
            key={producto.idProducto}
            onClick={() => onSelect?.(producto)}
            className={`flex w-full items-center justify-between gap-4 px-4 py-3 border-b border-gray-600 text-left transition-colors ${
              isSelected ? "bg-[#39476b]" : "hover:bg-[#39476b]"
            }`}
          >
            <div>
              <p className="font-medium text-white">
                {producto.nombreProducto}
              </p>

              <p className="text-sm text-gray-500">{producto.idProducto}</p>
            </div>

            <p className="text-lg font-semibold text-white">
              ${producto.precioUnitario.toFixed(2)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
