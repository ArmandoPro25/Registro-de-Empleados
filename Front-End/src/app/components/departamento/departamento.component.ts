import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent {
  departamentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.departamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }
  ngOnInit(): void {   
    
      // Obtener el ID del empleado desde la URL y cargar sus datos
      this.route.paramMap.subscribe(params => {
        const departamentoId = params.get('id');
        if (departamentoId) {
          this.departamentoService.obtenerDepartamentoPorId(departamentoId).subscribe(departamento => {
            this.departamentoForm.patchValue({
              nombre: departamento.nombre,
              estatus: departamento.estatus,
            });
          });
        }
      });
    }
  
  
    onSubmit(): void {
      if (this.departamentoForm.valid) {
        const formData = new FormData();
        const formValues = this.departamentoForm.value;
  
        // Campos básicos
        formData.append('nombre', formValues.nombre);
        formData.append('estatus', formValues.estatus);
  
        // Enviar datos al servidor
        this.departamentoService.crearDepartamento(formData).subscribe({
          next: (response) => {
            console.log('Departamento creada:', response);
            this.router.navigate(['/listado']);
          },
          error: (err) => {
            console.error('Error al crear departamento:', err);
          }
        });
      }
    }
  }