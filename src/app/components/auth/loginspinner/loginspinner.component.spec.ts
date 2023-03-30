import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginspinnerComponent } from './loginspinner.component';

xdescribe('LoginspinnerComponent', () => {
  let component: LoginspinnerComponent;
  let fixture: ComponentFixture<LoginspinnerComponent>;

  beforeEach(waitForAsync(() => {
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
