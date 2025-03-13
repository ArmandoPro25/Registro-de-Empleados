import { Component, OnInit } from '@angular/core';
import { ParentescoService } from '../../services/parentesco.service';

@Component({
  selector: 'app-parentescos',
  templateUrl: './parentescos.component.html',
  styleUrl: './parentescos.component.css'
})
export class ParentescosComponent implements OnInit {
  parentescos: any[] = [];

  constructor(private parentescoService: ParentescoService) {}

  ngOnInit(): void {
      this.parentescoService.obtenerParentescos().subscribe(data => {
          this.parentescos = data;
      });
  }

  eliminarParentesco(id: string): void {
      this.parentescoService.eliminarParentesco(id).subscribe(() => {
          this.parentescos = this.parentescos.filter(emp => emp._id !== id);
      });
  }
}
