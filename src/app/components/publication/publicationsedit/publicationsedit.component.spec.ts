import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationseditComponent } from './publicationsedit.component';

describe('PublicationseditComponent', () => {
  let component: PublicationseditComponent;
  let fixture: ComponentFixture<PublicationseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
