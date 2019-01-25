import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationscreateComponent } from './publicationscreate.component';

describe('PublicationscreateComponent', () => {
  let component: PublicationscreateComponent;
  let fixture: ComponentFixture<PublicationscreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationscreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
