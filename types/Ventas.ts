import {DetalleVentaGET,DetalleVentaPOST} from "./DetalleVenta";


export interface Ventas{
    idVenta: number;
    fecha: string;
    totalFinal: number;
    nombreCliente: string;
    nombreEmpleado: string;
    nombreSucursal: string;
    detalles: DetalleVentaGET[];
}

export interface VentasPOST {
    idCliente: number;
    idEmpleado: number;
    idSucursal: number;
    productos: DetalleVentaPOST[];
}
