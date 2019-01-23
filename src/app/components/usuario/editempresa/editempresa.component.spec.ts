import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditempresaComponent } from './editempresa.component';

describe('EditempresaComponent', () => {
  let component: EditempresaComponent;
  let fixture: ComponentFixture<EditempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
