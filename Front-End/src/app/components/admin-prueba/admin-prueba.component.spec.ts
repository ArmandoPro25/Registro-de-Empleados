import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPruebaComponent } from './admin-prueba.component';

describe('AdminPruebaComponent', () => {
  let component: AdminPruebaComponent;
  let fixture: ComponentFixture<AdminPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
