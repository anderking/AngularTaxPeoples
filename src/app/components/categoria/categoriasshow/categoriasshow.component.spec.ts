import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasshowComponent } from './categoriasshow.component';

describe('CategoriasshowComponent', () => {
  let component: CategoriasshowComponent;
  let fixture: ComponentFixture<CategoriasshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
