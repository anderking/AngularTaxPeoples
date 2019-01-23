import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserspadreComponent } from './userspadre.component';

describe('UserspadreComponent', () => {
  let component: UserspadreComponent;
  let fixture: ComponentFixture<UserspadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserspadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserspadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
