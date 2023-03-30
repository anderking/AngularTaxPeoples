import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationspadreComponent } from './publicationspadre.component';

xdescribe('PublicationspadreComponent', () => {
  let component: PublicationspadreComponent;
  let fixture: ComponentFixture<PublicationspadreComponent>;

  beforeEach(waitForAsync(() => {
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
