import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpersonaComponent } from './editpersona.component';

xdescribe('EditpersonaComponent', () => {
  let component: EditpersonaComponent;
  let fixture: ComponentFixture<EditpersonaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
