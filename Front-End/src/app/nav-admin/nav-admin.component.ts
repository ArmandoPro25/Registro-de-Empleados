import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {

  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
