import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
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
      this.actividadService.eliminarActividad(id).subscribe(() => {
          this.actividades = this.actividades.filter(emp => emp._id !== id);
      });
  }
}
