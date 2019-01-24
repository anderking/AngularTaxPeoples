import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaseditComponent } from './categoriasedit.component';

describe('CategoriaseditComponent', () => {
  let component: CategoriaseditComponent;
  let fixture: ComponentFixture<CategoriaseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
