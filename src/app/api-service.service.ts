import { Injectable } from '@angular/core';
import { IApiService } from './Services/IApiService.service';
import { Producto } from './Models/Producto.model';
import { MetaService } from './Services/MetaService.service';
import { RouteApi } from './Models/config';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService implements IApiService {
  private _baseUrl: string;
  constructor() { 
    //this._baseUrl = routeAPi.getRoute();
    this._baseUrl = "http://localhost:8080/api/productos";
  }
  //Funcion para obtener la lista de todos los productos
  async getProductos(): Promise<Producto[]> {
    const url = this._baseUrl + "/all";
    let objProductos: Producto[] = [];
    try{
      await fetch(url)
      .then(response => response.json())
      .then(data => objProductos = data.data as Producto[]);
    } catch (error) {
      console.log(error);
    }
    return objProductos;
  }

  //Funcion para insertar un producto nuevo
  async insertProducto(objProducto: Producto): Promise<MetaService> {
    let result: MetaService = {} as MetaService;
    const uri = this._baseUrl + "/create";
    if (objProducto == null) return result;

    try{
      await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objProducto)
      })
      .then(response => response.json())
      .then(data => result = data.meta as MetaService);
    }catch (error) {
      console.log(error);
    }
    return result;
  }

  //Funcion para actualizar un producto
  async updateProducto(objProducto: Producto): Promise<MetaService> {
    let result: MetaService = {} as MetaService;
    const uri = this._baseUrl + "/update";
    try {
      await fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objProducto)
      })
        .then(response => response.json())
        .then(data => result = data.meta as MetaService);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  //Funcion para eliminar un producto
  async deleteProducto(id: number): Promise<MetaService> {
    let result: MetaService = {} as MetaService;
    const uri = this._baseUrl + "/delete/" + id;
    try{
      await fetch(uri, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => result = data.meta as MetaService);
      return result;
    }catch (error) {
      console.log(error);
    }
    return result;
  }

  async getProductoById(nombre: string): Promise<Producto[]> {
    throw new Error('Method not implemented.');
  }
  
  async getProductosByNombre(nombre: string): Promise<Producto[]> {
    const url = this._baseUrl + "/getByNombre/" + nombre ;
    let objProductos: Producto[] = [];
    try {
      const response = await fetch(url)
        .then(response => response.json())
        .then(data => objProductos = data.data as Producto[]);
    } catch (error) {
      console.log(error);
    }
    return objProductos;
  }
}
