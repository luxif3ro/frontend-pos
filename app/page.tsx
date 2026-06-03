import { fetchProductos } from "@/actions/productos";
import { PosView } from "@/components/views/PosView";

export default async function Home() {
  const productos = await fetchProductos();
  return <PosView productos={productos} />;
}