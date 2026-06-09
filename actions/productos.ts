"use server";

import { Producto, ProductoPOST } from "@/types/Productos";

export async function fetchProductos(): Promise<Producto[]> {

  if (!process.env.API_URL) {
    console.error("API_URL no está definida en las variables de entorno.");
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/productos`,
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
    console.error("Error fetching productos:", error);
    return [];
  }
}

export async function createProducto(
  producto: ProductoPOST
): Promise<boolean> {
  console.log("Creando producto:", producto);
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/productos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      }
    );

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateProducto(
  producto: Producto
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/productos/${producto.idProducto}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      }
    );

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteProducto(
  idProducto: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/productos/${idProducto}`,
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