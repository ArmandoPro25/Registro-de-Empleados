import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';

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
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este departamento?');
    if (confirmacion) {
      this.departamentoService.eliminarDepartamento(id).subscribe(() => {
          this.departamentos = this.departamentos.filter(emp => emp._id !== id);
      });
    }
  }
}
