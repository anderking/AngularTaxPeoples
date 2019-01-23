import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNComponent } from './register-n.component';

describe('RegisterNComponent', () => {
  let component: RegisterNComponent;
  let fixture: ComponentFixture<RegisterNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
