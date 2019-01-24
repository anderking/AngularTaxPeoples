import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersdeleteComponent } from './usersdelete.component';

describe('UsersdeleteComponent', () => {
  let component: UsersdeleteComponent;
  let fixture: ComponentFixture<UsersdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
