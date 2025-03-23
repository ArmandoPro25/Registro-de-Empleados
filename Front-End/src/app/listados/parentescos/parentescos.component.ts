import { Component, OnInit } from '@angular/core';
import { ParentescoService } from '../../services/parentesco.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parentescos',
  templateUrl: './parentescos.component.html',
  styleUrls: ['./parentescos.component.css']
})
export class ParentescosComponent implements OnInit {
  parentescos: any[] = [];

  constructor(private parentescoService: ParentescoService) {}

  ngOnInit(): void {
    this.parentescoService.obtenerParentescos().subscribe(data => {
      this.parentescos = data;
    });
  }

  eliminarParentesco(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.parentescoService.eliminarParentesco(id).subscribe({
          next: () => {
            this.parentescos = this.parentescos.filter(p => p._id !== id);
            Swal.fire(
              '¡Eliminado!',
              'El parentesco ha sido eliminado correctamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el parentesco',
              'error'
            );
            console.error('Error al eliminar:', error);
          }
        });
      }
    });
  }
}
