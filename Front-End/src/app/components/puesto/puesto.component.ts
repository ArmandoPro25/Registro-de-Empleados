import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PuestoService } from '../../services/puesto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrl: './puesto.component.css'
})
export class PuestoComponent {
  puestoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private puestoService: PuestoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.puestoForm = this.fb.group({
      nombre: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }
  ngOnInit(): void {   
    
      // Obtener el ID del empleado desde la URL y cargar sus datos
      this.route.paramMap.subscribe(params => {
        const puestoId = params.get('id');
        if (puestoId) {
          this.puestoService.obtenerPuestoPorId(puestoId).subscribe(puesto => {
            this.puestoForm.patchValue({
              nombre: puesto.nombre,
              estatus: puesto.estatus,
            });
          });
        }
      });
    }
  
  
    onSubmit(): void {
      if (this.puestoForm.valid) {
        const formData = new FormData();
        const formValues = this.puestoForm.value;
  
        // Campos básicos
        formData.append('nombre', formValues.nombre);
        formData.append('estatus', formValues.estatus);
  
        // Enviar datos al servidor
        this.puestoService.crearPuesto(formData).subscribe({
          next: (response) => {
            console.log('Puesto creada:', response);
            this.router.navigate(['/listado']);
          },
          error: (err) => {
            console.error('Error al crear puesto:', err);
          }
        });
      }
    }
  }