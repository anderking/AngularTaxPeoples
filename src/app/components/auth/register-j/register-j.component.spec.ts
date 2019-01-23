import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJComponent } from './register-j.component';

describe('RegisterJComponent', () => {
  let component: RegisterJComponent;
  let fixture: ComponentFixture<RegisterJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
