"use server";

import { Ventas, VentasPOST } from "@/types/Ventas";


export async function fetchVentas(): Promise<Ventas[]> {
  if (!process.env.API_URL) {
    console.error("API_URL no está definida en las variables de entorno.");
    return [];
  }
  
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/ventas`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ventas:", error);
    return [];
  }
}

export async function createVenta(
  venta: VentasPOST
): Promise<boolean | ReadableStream<Uint8Array>> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/ventas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venta),
      }
    );

    return response.body? response.body :response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function deleteVenta(
  idVenta: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/ventas/${idVenta}`,
      {
        method: "DELETE",
      }
    );

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}