import { fetchProductos } from "@/actions/productos";
import { AlmacenView } from "@/components/views/AlmacenView";

export default async function Almacen() {
  const productos = await fetchProductos();
  return <AlmacenView productos={productos} />;
}