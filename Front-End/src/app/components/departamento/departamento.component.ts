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
    isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private departamentoService: DepartamentoService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.departamentoForm = this.fb.group({
        nombre: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const departamentoId = params.get('id');
        if (departamentoId) {
          this.isEditMode = true;
          this.departamentoService.obtenerDepartamentoPorId(departamentoId).subscribe({
            next: (departamento) => {
              this.departamentoForm.patchValue(departamento);
            },
            error: (err) => console.error('Error al cargar departamento:', err)
          });
        }
      });
    }

    onSubmit(): void {
      if (this.departamentoForm.valid) {
        const departamentoData = this.departamentoForm.value;
        const operation = this.isEditMode
          ? this.departamentoService.actualizarDepartamento(this.route.snapshot.params['id'], departamentoData)
          : this.departamentoService.crearDepartamento(departamentoData);

        operation.subscribe({
          next: () => {
            this.router.navigate(['/listadoDepartamentos']);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    }
  }
