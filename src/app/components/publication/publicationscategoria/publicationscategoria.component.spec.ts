import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationscategoriaComponent } from './publicationscategoria.component';

describe('PublicationscategoriaComponent', () => {
  let component: PublicationscategoriaComponent;
  let fixture: ComponentFixture<PublicationscategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationscategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationscategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
