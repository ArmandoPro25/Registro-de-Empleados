import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoPruebaComponent } from './empleado-prueba.component';

describe('EmpleadoPruebaComponent', () => {
  let component: EmpleadoPruebaComponent;
  let fixture: ComponentFixture<EmpleadoPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoPruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
