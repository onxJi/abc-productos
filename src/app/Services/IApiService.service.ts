
import { Producto } from "../Models/Producto.model";
import { MetaService } from "./MetaService.service";


export interface IApiService{
    getProductos(): Promise<Producto[]>;
    insertProducto(objProducto: Producto): Promise<MetaService>;
    updateProducto(objProducto: Producto): Promise<MetaService>;
    deleteProducto(id: number): Promise<MetaService>;
    getProductoById(nombre: string): Promise<Producto[]>;
    getProductosByNombre(nombre: string): Promise<Producto[]>;
}