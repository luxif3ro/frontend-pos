import { Ventas } from "@/types/Ventas";

interface VentaListProps {
  ventas: Ventas[];
  selectedVenta?: Ventas | null;
  onSelect?: (venta: Ventas) => void;
}

export function VentaList({
  ventas,
  selectedVenta,
  onSelect,
}: VentaListProps) {
  if (ventas.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-[#2B3145] bg-[#0F1320]">
        <p className="text-gray-400">No hay ventas registradas</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden   bg-[#0F1320]">
      {ventas.map((venta) => {
        const isSelected =
          selectedVenta?.idVenta === venta.idVenta;

        return (
          <button
            key={venta.idVenta}
            onClick={() => onSelect?.(venta)}
            className={`flex w-full items-center justify-between gap-4 px-4 py-3 border-b border-gray-600 text-left transition-colors ${
              isSelected ? "bg-[#39476b]" : "hover:bg-[#39476b]"
            }`}
          >
            <div>
              <p className="font-medium text-white">
                {venta.fecha}
              </p>

              <p className="text-sm text-gray-500">{venta.nombreEmpleado}</p>
            </div>

            <p className="text-lg font-semibold text-white">
              ${venta.totalFinal.toFixed(2)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
