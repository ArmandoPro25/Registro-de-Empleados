import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentescosComponent } from './parentescos.component';

describe('ParentescosComponent', () => {
  let component: ParentescosComponent;
  let fixture: ComponentFixture<ParentescosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentescosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentescosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
