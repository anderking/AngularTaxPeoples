import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationseditComponent } from './publicationsedit.component';

xdescribe('PublicationseditComponent', () => {
  let component: PublicationseditComponent;
  let fixture: ComponentFixture<PublicationseditComponent>;

  beforeEach(waitForAsync(() => {
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
