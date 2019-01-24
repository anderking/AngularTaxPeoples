import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinepadreComponent } from './timelinepadre.component';

describe('TimelinepadreComponent', () => {
  let component: TimelinepadreComponent;
  let fixture: ComponentFixture<TimelinepadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinepadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinepadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
