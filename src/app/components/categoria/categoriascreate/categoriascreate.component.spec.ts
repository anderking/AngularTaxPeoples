import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriascreateComponent } from './categoriascreate.component';

describe('CategoriascreateComponent', () => {
  let component: CategoriascreateComponent;
  let fixture: ComponentFixture<CategoriascreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriascreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
