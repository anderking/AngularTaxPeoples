import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsrutaComponent } from './publicationsruta.component';

describe('PublicationsrutaComponent', () => {
  let component: PublicationsrutaComponent;
  let fixture: ComponentFixture<PublicationsrutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsrutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
