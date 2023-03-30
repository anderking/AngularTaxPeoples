import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowpadreComponent } from './followpadre.component';

xdescribe('FollowpadreComponent', () => {
  let component: FollowpadreComponent;
  let fixture: ComponentFixture<FollowpadreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowpadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowpadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
