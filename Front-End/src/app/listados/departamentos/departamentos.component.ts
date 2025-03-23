import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(data => {
      this.departamentos = data;
    });
  }

  eliminarDepartamento(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción eliminará el departamento permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentoService.eliminarDepartamento(id).subscribe({
          next: () => {
            this.departamentos = this.departamentos.filter(dep => dep._id !== id);
            Swal.fire(
              '¡Eliminado!',
              'El departamento ha sido eliminado exitosamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al intentar eliminar el departamento',
              'error'
            );
            console.error('Error de eliminación:', error);
          }
        });
      }
    });
  }
}
