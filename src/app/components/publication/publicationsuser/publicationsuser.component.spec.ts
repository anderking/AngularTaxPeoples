import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsuserComponent } from './publicationsuser.component';

xdescribe('PublicationsuserComponent', () => {
  let component: PublicationsuserComponent;
  let fixture: ComponentFixture<PublicationsuserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
