import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTComponent } from './register-t.component';

describe('RegisterTComponent', () => {
  let component: RegisterTComponent;
  let fixture: ComponentFixture<RegisterTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
