import { Component, OnInit } from '@angular/core';
import { PuestoService } from '../../services/puesto.service';

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
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este puesto?');
    if (confirmacion) {
      this.puestoService.eliminarPuesto(id).subscribe(() => {
          this.puestos = this.puestos.filter(emp => emp._id !== id);
      });
    }
  }
}
