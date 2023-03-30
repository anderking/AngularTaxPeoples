import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsshowComponent } from './publicationsshow.component';

xdescribe('PublicationsshowComponent', () => {
  let component: PublicationsshowComponent;
  let fixture: ComponentFixture<PublicationsshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
