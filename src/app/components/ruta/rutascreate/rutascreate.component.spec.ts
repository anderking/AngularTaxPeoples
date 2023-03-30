import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutascreateComponent } from './rutascreate.component';

xdescribe('RutascreateComponent', () => {
  let component: RutascreateComponent;
  let fixture: ComponentFixture<RutascreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RutascreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
