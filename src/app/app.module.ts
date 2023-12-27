import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { ApiServiceService } from './api-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteApi } from './Models/config';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiServiceService,
    RouteApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
