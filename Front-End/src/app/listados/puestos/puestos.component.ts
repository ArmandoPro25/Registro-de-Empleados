import { Component, OnInit } from '@angular/core';
import { PuestoService } from '../../services/puesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  puestos: any[] = [];

  constructor(private puestoService: PuestoService) {}

  ngOnInit(): void {
    this.puestoService.obtenerPuestos().subscribe(data => {
      this.puestos = data;
    });
  }

  eliminarPuesto(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción eliminará el puesto de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.puestoService.eliminarPuesto(id).subscribe({
          next: () => {
            this.puestos = this.puestos.filter(puesto => puesto._id !== id);
            Swal.fire(
              '¡Eliminado!',
              'El puesto ha sido eliminado exitosamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el puesto. Intente nuevamente.',
              'error'
            );
            console.error('Error eliminando puesto:', error);
          }
        });
      }
    });
  }
}
