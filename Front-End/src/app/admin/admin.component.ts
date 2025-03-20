import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  empleadoForm: FormGroup;
  departamentos: any[] = [];
  puestos: any[] = [];
  parentescos: any[] = [];
  actividades: any[] = [];

  nuevaImagen: File | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empleadoForm = this.fb.group({
      Nombres: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Sexo: ['', Validators.required],
      FotoEmpleado: [''],
      Domicilio: this.fb.group({
        Calle: [''],
        NumeroExterior: [''],
        NumeroInterior: [''],
        Colonia: [''],
        CP: [''],
        Ciudad: ['']
      }),
      Departamento: [''],
      Puesto: [''],
      Telefono: this.fb.array([]),
      CorreoElectronico: this.fb.array([]),
      ReferenciasFamiliares: this.fb.array([]),
      CursosTomados: this.fb.array([]),
      ParticipacionActividades: this.fb.array([])
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }



  ngOnInit(): void {
    this.cargarSelects();

    this.route.paramMap.subscribe(params => {
      const empleadoId = params.get('id');

      if (empleadoId) {
        this.cargarEmpleadoParaEdicion(empleadoId);
      } else {
        // Solo agregar campos vacíos si es un nuevo empleado
        this.agregarTelefono();
        this.agregarCorreo();
        this.agregarReferenciaFamiliar();
        this.agregarCursoTomado();
        this.agregarActividad();
      }
    });
  }

  cargarSelects(): void {
    this.empleadoService.obtenerDepartamentos().subscribe(data => this.departamentos = data);
    this.empleadoService.obtenerPuestos().subscribe(data => this.puestos = data);
    this.empleadoService.obtenerParentescos().subscribe(data => this.parentescos = data);
    this.empleadoService.obtenerActividades().subscribe(data => this.actividades = data);
  }

  cargarEmpleadoParaEdicion(empleadoId: string): void {
    this.empleadoService.obtenerEmpleadoPorId(empleadoId).subscribe(empleado => {
      this.empleadoForm.patchValue({
        Nombres: empleado.NombreEmpleado.Nombres,
        ApellidoPaterno: empleado.NombreEmpleado.ApellidoPaterno,
        ApellidoMaterno: empleado.NombreEmpleado.ApellidoMaterno,
        FechaNacimiento: this.formatDate(empleado.FechaNacimiento),
        Sexo: empleado.Sexo,
        FotoEmpleado: empleado.FotoEmpleado,
        Departamento: empleado.Departamento,
        Puesto: empleado.Puesto,
        Domicilio: empleado.Domicilio
      });

      this.setTelefonos(empleado.Telefono);
      this.setCorreos(empleado.CorreoElectronico);
      this.setReferenciasFamiliares(empleado.ReferenciasFamiliares);
      this.setCursosTomados(empleado.CursosTomados);
      this.setParticipacionActividades(empleado.ParticipacionActividades);
    });
  }

  // Métodos para cargar los datos en los FormArrays
  setTelefonos(telefonos: string[]) {
    if (telefonos && telefonos.length > 0) {
      telefonos.forEach(telefono => {
        this.telefonos.push(this.fb.control(telefono));
      });
    }
  }

  setCorreos(correos: string[]) {
    if (correos && correos.length > 0) {
      correos.forEach(correo => {
        this.correos.push(this.fb.control(correo));
      });
    }
  }

  setReferenciasFamiliares(referencias: any[]) {
    referencias.forEach(ref => {
      this.referencias.push(this.fb.group({
        NombreCompleto: [ref.NombreCompleto],
        Parentesco: [ref.Parentesco],
        Telefono: [ref.Telefono],
        CorreoElectronico: [ref.CorreoElectronico]
      }));
    });
  }

  setCursosTomados(cursos: any[]) {
    cursos.forEach(curso => {
      this.cursos.push(this.fb.group({
        NombreCurso: [curso.NombreCurso],
        FechaInicio: [this.formatDate(curso.FechaInicio)],
      FechaTermino: [this.formatDate(curso.FechaTermino)],
        DocumentoRecibido: [curso.DocumentoRecibido]
      }));
    });
  }

  setParticipacionActividades(actividades: any[]) {
    actividades.forEach(actividad => {
      this.actividadesArray.push(this.fb.group({
        Actividad: [actividad.Actividad],
        Estatus: [actividad.Estatus]
      }));
    });
  }

  // Métodos para manejar FormArrays
  get telefonos(): FormArray {
    return this.empleadoForm.get('Telefono') as FormArray;
  }

  get correos(): FormArray {
    return this.empleadoForm.get('CorreoElectronico') as FormArray;
  }

  get referencias(): FormArray {
    return this.empleadoForm.get('ReferenciasFamiliares') as FormArray;
  }

  get cursos(): FormArray {
    return this.empleadoForm.get('CursosTomados') as FormArray;
  }

  get actividadesArray(): FormArray {
    return this.empleadoForm.get('ParticipacionActividades') as FormArray;
  }

  agregarTelefono(): void {
    this.telefonos.push(this.fb.control(''));
  }

  agregarCorreo(): void {
    this.correos.push(this.fb.control(''));
  }

  agregarReferenciaFamiliar(): void {
    this.referencias.push(this.fb.group({
      NombreCompleto: [''],
      Parentesco: [''],
      Telefono: [''],
      CorreoElectronico: ['']
    }));
  }

  agregarCursoTomado(): void {
    this.cursos.push(this.fb.group({
      NombreCurso: [''],
      FechaInicio: [''],
      FechaTermino: [''],
      DocumentoRecibido: ['']
    }));
  }

  agregarActividad(): void {
    this.actividadesArray.push(this.fb.group({
      Actividad: [''],
      Estatus: ['']
    }));
  }

  eliminarTelefono(index: number): void {
    this.telefonos.removeAt(index);
  }

  eliminarCorreo(index: number): void {
    this.correos.removeAt(index);
  }

  eliminarReferencia(index: number): void {
    this.referencias.removeAt(index);
  }

  eliminarCurso(index: number): void {
    this.cursos.removeAt(index);
  }

  eliminarActividad(index: number): void {
    this.actividadesArray.removeAt(index);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.nuevaImagen = file;
      this.empleadoForm.patchValue({ FotoEmpleado: file });
    }
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const formData = new FormData();
      const empleadoId = this.route.snapshot.paramMap.get('id');
      const formValues = this.empleadoForm.value;

      // Campos básicos
      formData.append('Nombres', formValues.Nombres);
      formData.append('ApellidoPaterno', formValues.ApellidoPaterno);
      formData.append('ApellidoMaterno', formValues.ApellidoMaterno);
      formData.append('FechaNacimiento', formValues.FechaNacimiento);
      formData.append('Sexo', formValues.Sexo);

      // Domicilio
      formData.append('Domicilio[Calle]', formValues.Domicilio.Calle || '');
      formData.append('Domicilio[NumeroExterior]', formValues.Domicilio.NumeroExterior || '');
      formData.append('Domicilio[NumeroInterior]', formValues.Domicilio.NumeroInterior || '');
      formData.append('Domicilio[Colonia]', formValues.Domicilio.Colonia || '');
      formData.append('Domicilio[CP]', formValues.Domicilio.CP || '');
      formData.append('Domicilio[Ciudad]', formValues.Domicilio.Ciudad || '');

      // Departamento y Puesto
      formData.append('Departamento', formValues.Departamento || '');
      formData.append('Puesto', formValues.Puesto || '');

      // Teléfonos
      formValues.Telefono.forEach((telefono: string, index: number) => {
        formData.append(`Telefono[${index}]`, telefono);
      });

      // Correos Electrónicos
      formValues.CorreoElectronico.forEach((correo: string, index: number) => {
        formData.append(`CorreoElectronico[${index}]`, correo);
      });

      // Referencias Familiares
      formValues.ReferenciasFamiliares.forEach((referencia: any, index: number) => {
        formData.append(`ReferenciasFamiliares[${index}][NombreCompleto]`, referencia.NombreCompleto || '');
        formData.append(`ReferenciasFamiliares[${index}][Parentesco]`, referencia.Parentesco || '');
        formData.append(`ReferenciasFamiliares[${index}][Telefono]`, referencia.Telefono || '');
        formData.append(`ReferenciasFamiliares[${index}][CorreoElectronico]`, referencia.CorreoElectronico || '');
      });

      // Cursos Tomados
      formValues.CursosTomados.forEach((curso: any, index: number) => {
        formData.append(`CursosTomados[${index}][NombreCurso]`, curso.NombreCurso || '');
        formData.append(`CursosTomados[${index}][FechaInicio]`, curso.FechaInicio || '');
        formData.append(`CursosTomados[${index}][FechaTermino]`, curso.FechaTermino || '');
        formData.append(`CursosTomados[${index}][DocumentoRecibido]`, curso.DocumentoRecibido || '');
      });

      // Participación en Actividades
      formValues.ParticipacionActividades.forEach((actividad: any, index: number) => {
        formData.append(`ParticipacionActividades[${index}][Actividad]`, actividad.Actividad || '');
        formData.append(`ParticipacionActividades[${index}][Estatus]`, actividad.Estatus || '');
      });

      // Archivo de imagen
      if (this.nuevaImagen) {
        formData.append('FotoEmpleado', this.nuevaImagen, this.nuevaImagen.name);
      }

      // Enviar datos al servidor
      if (empleadoId) {
        // Actualización
        this.empleadoService.actualizarEmpleado(empleadoId, formData).subscribe({
          next: (response) => {
            this.router.navigate(['/listado']);
          },
          error: (err) => {
            console.error('Error al actualizar:', err);
          }
        });
      } else {
        // Creación
        this.empleadoService.crearEmpleado(formData).subscribe({
          next: (response) => {
            this.router.navigate(['/listado'])
          },
          error: (err) => {
            console.error('Error al crear:', err);
          }
        });
      }
    }
  }
}
