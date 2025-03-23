import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividades: any[] = [];

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.actividadService.obtenerActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  eliminarActividad(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta Actividad?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.eliminarActividad(id).subscribe({
          next: () => {
            this.actividades = this.actividades.filter(act => act._id !== id);
            Swal.fire(
              '¡Eliminada!',
              'La actividad ha sido eliminada.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un problema al eliminar la actividad',
              'error'
            );
            console.error('Error al eliminar:', error);
          }
        });
      }
    });
  }
}
