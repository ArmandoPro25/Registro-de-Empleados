import { Component, OnInit } from '@angular/core';
import { PuestoService } from '../../services/puesto.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrl: './puestos.component.css'
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
      this.puestoService.eliminarPuesto(id).subscribe(() => {
          this.puestos = this.puestos.filter(emp => emp._id !== id);
      });
  }
}
