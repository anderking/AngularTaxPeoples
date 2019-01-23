import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestringidoComponent } from './restringido.component';

describe('RestringidoComponent', () => {
  let component: RestringidoComponent;
  let fixture: ComponentFixture<RestringidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestringidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestringidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
