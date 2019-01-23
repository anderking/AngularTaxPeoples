import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPadreComponent } from './register-padre.component';

describe('RegisterPadreComponent', () => {
  let component: RegisterPadreComponent;
  let fixture: ComponentFixture<RegisterPadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
