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
    isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private puestoService: PuestoService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.puestoForm = this.fb.group({
        nombre: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const puestoId = params.get('id');
        if (puestoId) {
          this.isEditMode = true;
          this.puestoService.obtenerPuestoPorId(puestoId).subscribe({
            next: (puesto) => {
              this.puestoForm.patchValue(puesto);
            },
            error: (err) => console.error('Error al cargar puesto:', err)
          });
        }
      });
    }

    onSubmit(): void {
      if (this.puestoForm.valid) {
        const puestoData = this.puestoForm.value;
        const operation = this.isEditMode
          ? this.puestoService.actualizarPuesto(this.route.snapshot.params['id'], puestoData)
          : this.puestoService.crearPuesto(puestoData);

        operation.subscribe({
          next: () => {
            this.router.navigate(['/listadoPuestos']);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    }
  }
