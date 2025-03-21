import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { ListadoComponent } from './listado/listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { ParentescoComponent } from './components/parentesco/parentesco.component';
import { DepartamentosComponent } from './listados/departamentos/departamentos.component';
import { PuestosComponent } from './listados/puestos/puestos.component';
import { ParentescosComponent } from './listados/parentescos/parentescos.component';
import { ActividadesComponent } from './listados/actividades/actividades.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ListadoComponent,
    DepartamentoComponent,
    PuestoComponent,
    ParentescoComponent,
    DepartamentosComponent,
    PuestosComponent,
    ParentescosComponent,
    ActividadComponent,
    ActividadesComponent,
    EmpleadoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
