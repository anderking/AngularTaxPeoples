import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTComponent } from './register-t.component';

xdescribe('RegisterTComponent', () => {
  let component: RegisterTComponent;
  let fixture: ComponentFixture<RegisterTComponent>;

  beforeEach(waitForAsync(() => {
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
