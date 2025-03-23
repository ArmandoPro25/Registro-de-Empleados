import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  empleados: any[] = [];
  empleadoHover: any = null;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.obtenerEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  eliminarEmpleado(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: () => {
            // Eliminar del listado solo si es exitoso
            this.empleados = this.empleados.filter(emp => emp._id !== id);

            // Agregar confirmación de éxito
            Swal.fire(
              '¡Eliminado!',
              'El empleado ha sido eliminado.',
              'success'
            );
          },
          error: (error) => {
            // Manejar errores
            Swal.fire(
              'Error',
              'Ocurrió un problema al eliminar el empleado',
              'error'
            );
            console.error('Error al eliminar:', error);
          }
        });
      }
    });
  }
}

