import { ListadoComponent } from './listado/listado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { ParentescoComponent } from './components/parentesco/parentesco.component';
import { PuestoComponent } from './components/puesto/puesto.component';

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
  { path: 'puesto', component: PuestoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
