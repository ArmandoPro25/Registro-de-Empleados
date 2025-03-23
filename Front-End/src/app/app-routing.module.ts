import { ListadoComponent } from './listado/listado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { ParentescoComponent } from './components/parentesco/parentesco.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { ActividadesComponent } from './listados/actividades/actividades.component';
import { DepartamentosComponent } from './listados/departamentos/departamentos.component';
import { PuestosComponent } from './listados/puestos/puestos.component';
import { ParentescosComponent } from './listados/parentescos/parentescos.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';
import { AdminPruebaComponent } from './components/admin-prueba/admin-prueba.component';
import { EmpleadoPruebaComponent } from './components/empleado-prueba/empleado-prueba.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'crear', component: AdminComponent },
  { path: 'editar/:id', component: AdminComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'actividad', component: ActividadComponent },
  { path: 'actividad/:id', component: ActividadComponent },
  { path: 'departamento', component: DepartamentoComponent },
  { path: 'departamento/:id', component: DepartamentoComponent },
  { path: 'parentesco', component: ParentescoComponent },
  { path: 'parentesco/:id', component: ParentescoComponent },
  { path: 'puesto/:id', component: PuestoComponent },
  { path: 'puesto', component: PuestoComponent },
  { path: 'listadoActividades', component: ActividadesComponent },
  { path: 'listadoDepartamentos', component: DepartamentosComponent },
  { path: 'listadoPuestos', component: PuestosComponent },
  { path: 'listadoParentescos', component: ParentescosComponent },
  { path: 'detalles/:id', component: EmpleadoDetalleComponent },
  { path: 'admin', component: AdminPruebaComponent },
  { path: 'empleado', component: EmpleadoPruebaComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
