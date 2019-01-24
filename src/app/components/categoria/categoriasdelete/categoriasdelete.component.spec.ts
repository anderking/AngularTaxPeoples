import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasdeleteComponent } from './categoriasdelete.component';

describe('CategoriasdeleteComponent', () => {
  let component: CategoriasdeleteComponent;
  let fixture: ComponentFixture<CategoriasdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
