export interface Producto {
  idProducto: number;
  nombreProducto: string;
  costo: number;
  precioUnitario: number;
  precioPieza: number;
  precioPaquete: number;
  activo: boolean;
  idProveedor: number;
}

export interface ProductoPOST {
  nombreProducto: string;
  costo: number;
  precioUnitario: number;
  precioPieza: number;
  precioPaquete: number;
  activo: boolean;
  idProveedor: number;
}