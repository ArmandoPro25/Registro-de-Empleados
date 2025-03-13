import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActividadService } from '../../services/actividad.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent {
  actividadForm: FormGroup;
    isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private actividadService: ActividadService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.actividadForm = this.fb.group({
        nombre: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const actividadId = params.get('id');
        if (actividadId) {
          this.isEditMode = true;
          this.actividadService.obtenerActividadPorId(actividadId).subscribe({
            next: (actividad) => {
              this.actividadForm.patchValue(actividad);
            },
            error: (err) => console.error('Error al cargar actividad:', err)
          });
        }
      });
    }

    onSubmit(): void {
      if (this.actividadForm.valid) {
        const actividadData = this.actividadForm.value;
        const operation = this.isEditMode
          ? this.actividadService.actualizarActividad(this.route.snapshot.params['id'], actividadData)
          : this.actividadService.crearActividad(actividadData);

        operation.subscribe({
          next: () => {
            this.router.navigate(['/listadoActividades']);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    }
  }
