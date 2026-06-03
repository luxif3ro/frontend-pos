import { Producto } from "@/types/Productos";

interface ProductCardProps {
  producto: Producto;
  onAdd?: (producto: Producto) => void;
}

export function ProductCard({
  producto,
  onAdd,
}: ProductCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#2B3145]
        bg-[#0F1320]
        p-4
        transition-all
        hover:border-blue-500
        hover:shadow-lg
        hover:shadow-blue-500/10
      "
    >
      <div className="mb-4">
        <h3
          className="
            line-clamp-2
            text-lg
            font-semibold
            text-white
          "
        >
          {producto.nombreProducto}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          ID: {producto.idProducto}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-blue-400">
          $
          {producto.precioUnitario.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onAdd?.(producto)}
        className="
          w-full
          rounded-xl
          bg-blue-600
          px-4
          py-2
          font-medium
          text-white
          transition-colors
          hover:bg-blue-500
        "
      >
        Agregar
      </button>
    </div>
  );
}