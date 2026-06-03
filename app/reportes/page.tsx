import { fetchVentas } from "@/actions/ventas";
import { RegistroView } from "@/components/views/RegistroView";

export default async function Almacen() {
  const ventas = await fetchVentas();
  return <RegistroView ventas={ventas} />;
}