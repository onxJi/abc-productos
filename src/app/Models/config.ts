import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class RouteApi{

    private _baseUrl: string;
    constructor() {
        this._baseUrl = "http://localhost:8080/api/productos";
    }

    //Funcion que retorna la ruta de la api
    getRoute(): string {
        return this._baseUrl;
    } 
}