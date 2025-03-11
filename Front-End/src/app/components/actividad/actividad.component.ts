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

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }
  ngOnInit(): void {   
    
      // Obtener el ID del empleado desde la URL y cargar sus datos
      this.route.paramMap.subscribe(params => {
        const actividadId = params.get('id');
        if (actividadId) {
          this.actividadService.obtenerActividadPorId(actividadId).subscribe(actividad => {
            this.actividadForm.patchValue({
              nombre: actividad.nombre,
              estatus: actividad.estatus,
            });
          });
        }
      });
    }
  
  
    onSubmit(): void {
      if (this.actividadForm.valid) {
        const formData = new FormData();
        const formValues = this.actividadForm.value;
  
        // Campos básicos
        formData.append('nombre', formValues.nombre);
        formData.append('estatus', formValues.estatus);
  
        // Enviar datos al servidor
        this.actividadService.crearActividad(formData).subscribe({
          next: (response) => {
            console.log('Actividad creada:', response);
            this.router.navigate(['/listado']);
          },
          error: (err) => {
            console.error('Error al crear actividad:', err);
          }
        });
      }
    }
  }