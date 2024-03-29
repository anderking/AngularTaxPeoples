import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsrutaComponent } from './publicationsruta.component';

xdescribe('PublicationsrutaComponent', () => {
  let component: PublicationsrutaComponent;
  let fixture: ComponentFixture<PublicationsrutaComponent>;

  beforeEach(waitForAsync(() => {
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
