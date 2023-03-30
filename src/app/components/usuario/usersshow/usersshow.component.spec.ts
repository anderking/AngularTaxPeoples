import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersshowComponent } from './usersshow.component';

xdescribe('UsersshowComponent', () => {
  let component: UsersshowComponent;
  let fixture: ComponentFixture<UsersshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
