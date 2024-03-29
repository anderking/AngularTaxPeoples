import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationscreateComponent } from './publicationscreate.component';

xdescribe('PublicationscreateComponent', () => {
  let component: PublicationscreateComponent;
  let fixture: ComponentFixture<PublicationscreateComponent>;

  beforeEach(waitForAsync(() => {
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
