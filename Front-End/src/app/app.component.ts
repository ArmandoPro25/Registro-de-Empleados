import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Registro';
  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 10) {
      navbar.classList.add('scroll-active');
    } else {
      navbar.classList.remove('scroll-active');
    }
  }
}
