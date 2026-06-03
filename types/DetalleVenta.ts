export interface DetalleVentaGET {
    nombreProducto: string;
    cantidad: number;
    subTotal: number;
}

export interface DetalleVentaPOST {
    idProducto: number;
    cantidad: number;
}