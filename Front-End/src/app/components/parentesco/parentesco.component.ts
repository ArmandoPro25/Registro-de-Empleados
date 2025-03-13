import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ParentescoService } from '../../services/parentesco.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parentesco',
  templateUrl: './parentesco.component.html',
  styleUrl: './parentesco.component.css'
})
export class ParentescoComponent {
  parentescoForm: FormGroup;
    isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private parentescoService: ParentescoService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.parentescoForm = this.fb.group({
        parentesco: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const parentescoId = params.get('id');
        if (parentescoId) {
          this.isEditMode = true;
          this.parentescoService.obtenerParentescoPorId(parentescoId).subscribe({
            next: (parentesco) => {
              this.parentescoForm.patchValue(parentesco);
            },
            error: (err) => console.error('Error al cargar parentesco:', err)
          });
        }
      });
    }

    onSubmit(): void {
      if (this.parentescoForm.valid) {
        const parentescoData = this.parentescoForm.value;
        const operation = this.isEditMode
          ? this.parentescoService.actualizarParentesco(this.route.snapshot.params['id'], parentescoData)
          : this.parentescoService.crearParentesco(parentescoData);

        operation.subscribe({
          next: () => {
            this.router.navigate(['/listadoParentescos']);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    }
  }
