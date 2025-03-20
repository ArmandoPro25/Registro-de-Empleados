import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  empleados: any[] = [];
  empleadoHover: any = null;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
      this.empleadoService.obtenerEmpleados().subscribe(data => {
          this.empleados = data;
      });
  }

  eliminarEmpleado(id: string): void {
      // Mostrar el mensaje de confirmación
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');

      // Si el usuario confirma la eliminación
      if (confirmDelete) {
          this.empleadoService.eliminarEmpleado(id).subscribe(() => {
              // Filtrar el empleado eliminado de la lista
              this.empleados = this.empleados.filter(emp => emp._id !== id);
          });
      }
  }
}
