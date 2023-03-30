import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationscategoriaComponent } from './publicationscategoria.component';

xdescribe('PublicationscategoriaComponent', () => {
  let component: PublicationscategoriaComponent;
  let fixture: ComponentFixture<PublicationscategoriaComponent>;

  beforeEach(waitForAsync(() => {
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
