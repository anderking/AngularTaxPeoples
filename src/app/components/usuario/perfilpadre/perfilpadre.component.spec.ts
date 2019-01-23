import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilpadreComponent } from './perfilpadre.component';

describe('PerfilpadreComponent', () => {
  let component: PerfilpadreComponent;
  let fixture: ComponentFixture<PerfilpadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilpadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilpadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
