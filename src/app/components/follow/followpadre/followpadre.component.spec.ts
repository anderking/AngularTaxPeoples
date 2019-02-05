import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowpadreComponent } from './followpadre.component';

describe('FollowpadreComponent', () => {
  let component: FollowpadreComponent;
  let fixture: ComponentFixture<FollowpadreComponent>;

  beforeEach(async(() => {
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
