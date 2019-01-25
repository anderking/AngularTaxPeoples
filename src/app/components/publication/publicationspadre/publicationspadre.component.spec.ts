import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationspadreComponent } from './publicationspadre.component';

describe('PublicationspadreComponent', () => {
  let component: PublicationspadreComponent;
  let fixture: ComponentFixture<PublicationspadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationspadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationspadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
