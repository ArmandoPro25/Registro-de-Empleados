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

  constructor(
    private fb: FormBuilder,
    private parentescoService: ParentescoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.parentescoForm = this.fb.group({
      parentesco: ['', Validators.required],
    });
  }
  ngOnInit(): void {   
    
      // Obtener el ID del empleado desde la URL y cargar sus datos
      this.route.paramMap.subscribe(params => {
        const parentescoId = params.get('id');
        if (parentescoId) {
          this.parentescoService.obtenerParentescoPorId(parentescoId).subscribe(parentesco => {
            this.parentescoForm.patchValue({
              parentesco: parentesco.parentesco,
            });
          });
        }
      });
    }
  
  
    onSubmit(): void {
      if (this.parentescoForm.valid) {
        const formData = new FormData();
        const formValues = this.parentescoForm.value;
  
        // Campos básicos
        formData.append('parentesco', formValues.parentesco);
  
        // Enviar datos al servidor
        this.parentescoService.crearParentesco(formData).subscribe({
          next: (response) => {
            console.log('Parentesco creada:', response);
            this.router.navigate(['/listado']);
          },
          error: (err) => {
            console.error('Error al crear parentesco:', err);
          }
        });
      }
    }
  }