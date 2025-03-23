import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrl: './empleado-detalle.component.css'
})
export class EmpleadoDetalleComponent {
  empleado: any;

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empleadoService.obtenerEmpleados().subscribe(empleados => {
        this.empleado = empleados.find((emp: any) => emp._id === id);
      });
    }
  }
}
