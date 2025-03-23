import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { ListadoComponent } from './listados/listado/listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { ParentescoComponent } from './components/parentesco/parentesco.component';
import { DepartamentosComponent } from './listados/departamentos/departamentos.component';
import { PuestosComponent } from './listados/puestos/puestos.component';
import { ParentescosComponent } from './listados/parentescos/parentescos.component';
import { ActividadesComponent } from './listados/actividades/actividades.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { EmpleadoDetalleComponent } from './components/empleado-detalle/empleado-detalle.component';
import { LoginComponent } from './components/auth/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { NavEmpleadoComponent } from './nav-empleado/nav-empleado.component';



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
    EmpleadoDetalleComponent,
    LoginComponent,
    NavAdminComponent,
    NavEmpleadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
