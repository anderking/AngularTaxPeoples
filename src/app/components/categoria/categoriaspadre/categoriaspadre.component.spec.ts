import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaspadreComponent } from './categoriaspadre.component';

describe('CategoriaspadreComponent', () => {
  let component: CategoriaspadreComponent;
  let fixture: ComponentFixture<CategoriaspadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaspadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaspadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
