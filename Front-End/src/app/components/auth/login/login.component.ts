import { Component } from '@angular/core';
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
  passwordVisible: boolean = false;
  passwordFieldType: string = 'password';
  showLogin: boolean = false;
  particles: any[] = Array(50).fill(0);

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  constructor(private router: Router, private empleadoService: EmpleadoService) { }

  login() {
    this.empleadoService.autenticacion(this.username, this.password)
      .subscribe(response => {
        const { token, empleado } = response;
        localStorage.setItem('token', token);

        if (empleado.Rol === 'admin') {
          this.router.navigate(['/crear']);
        } else if (empleado.Rol === 'empleado') {
          this.router.navigate(['/empleado']);
        } else {
          console.error('Rol no válido');
        }
      }, error => {
        console.error('Error en la autenticación', error);
      });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';  // Cambiar el tipo de input
  }
}
