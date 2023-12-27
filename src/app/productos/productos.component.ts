import { Component, OnInit } from '@angular/core';
import { Producto } from '../Models/Producto.model';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements  OnInit {

  // Fields 
  form: FormGroup;
  closedForm: boolean = false;
  productos: Producto[];
  tbId: number;
  tbNombre: string;
  tbPrecio: number;
  tbDescripcion: string;
  sentID: number;
  searchText: string;
  typeOperation: string = "Insertar";
  // Constructor
  constructor(private apiService: ApiServiceService,
    private formBuilder: FormBuilder) {
    this.apiService = new ApiServiceService();
    this.valideForm();
  }

  // Methods
  async ngOnInit() {
    this.productos = await this.apiService.getProductos();
    this.valideForm();
  }

  //Funcion para recargar la lista de productos
  async loadAgain() {
    this.productos = await this.apiService.getProductos();
  }
  get validNombre(){
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched;
  }
  get validDescripcion(){
    return this.form.get('descripcion')?.invalid && this.form.get('descripcion')?.touched;
  }
  get validPrecio(){
    return this.form.get('precio')?.invalid && this.form.get('precio')?.touched ;
  }
  valideForm() {
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.minLength(3)]]

    });
  }
  
  sendId(id: number) {
    this.sentID = id;
  }
  async tipoOperacion(){
    if(!this.form.invalid && this.typeOperation == "Insertar"){
      console.log("Insertando producto");
      await this.insertProducto();
      
    }
    else if(!this.form.invalid && this.typeOperation == "Actualizar"){
      console.log("Actualizando producto");
      await this.updateProducto();
      
    }
    
    else{
      alert("No se puede realizar la operacion");
    }
  }
  async insertProducto() {
    let objProducto: Producto = {} as Producto;
    objProducto.nombre = this.tbNombre;
    objProducto.precio = this.tbPrecio;
    objProducto.descripcion = this.tbDescripcion;
    let result = await this.apiService.insertProducto(objProducto);
    if (result.statusCode == 200) {
      this.closedForm = false;
      this.loadAgain();
    }
    this.form.reset();
  }

  changeValues(producto: Producto){
    this.typeOperation = "Actualizar";
    this.tbId = producto.id;
    this.tbNombre = producto.nombre;
    this.tbPrecio = producto.precio;
    this.tbDescripcion = producto.descripcion;
  }
  async updateProducto() {
    let objProducto: Producto = {} as Producto;
    objProducto.id = this.tbId;
    objProducto.nombre = this.tbNombre;
    objProducto.precio = this.tbPrecio;
    objProducto.descripcion = this.tbDescripcion;
    let result = await this.apiService.updateProducto(objProducto);
    if (result.statusCode == 200) {
      console.log("Producto actualizado correctamente");
      this.form.reset();
      this.closedForm = false;
      this.loadAgain();
      this.tbId = 0;
    }
    
  }
  async deleteProducto(id: number) {
    let result = await this.apiService.deleteProducto(id);
    if (result.statusCode == 200) {
      console.log("Producto eliminado correctamente");
      this.loadAgain();
    }
  }

  async searchProductos(){
    if(this.searchText != null && this.searchText != ""){
      this.productos = await this.apiService.getProductosByNombre(this.searchText);
    }
    else{
      this.productos = await this.apiService.getProductos();
    }
  }
}
