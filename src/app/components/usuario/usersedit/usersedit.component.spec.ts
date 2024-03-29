import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserseditComponent } from './usersedit.component';

xdescribe('UserseditComponent', () => {
  let component: UserseditComponent;
  let fixture: ComponentFixture<UserseditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
