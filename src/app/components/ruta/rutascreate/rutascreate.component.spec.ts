import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutascreateComponent } from './rutascreate.component';

describe('RutascreateComponent', () => {
  let component: RutascreateComponent;
  let fixture: ComponentFixture<RutascreateComponent>;

  beforeEach(async(() => {
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
