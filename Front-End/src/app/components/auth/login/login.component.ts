import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ""; 
  password: string = "";

  constructor(private router: Router, private empleadoService: EmpleadoService) { }

  login() {
    this.empleadoService.autenticacion(this.username, this.password)
      .subscribe(response => {
        const { token, empleado } = response;
        localStorage.setItem('token', token);

        if (empleado.Rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/empleado']);
        }
      }, error => {
        console.error('Error en la autenticación', error);
      });
  }
}
