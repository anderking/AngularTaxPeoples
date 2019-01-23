import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginspinnerComponent } from './loginspinner.component';

describe('LoginspinnerComponent', () => {
  let component: LoginspinnerComponent;
  let fixture: ComponentFixture<LoginspinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginspinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
