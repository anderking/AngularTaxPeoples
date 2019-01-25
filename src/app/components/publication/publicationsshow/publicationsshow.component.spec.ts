import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsshowComponent } from './publicationsshow.component';

describe('PublicationsshowComponent', () => {
  let component: PublicationsshowComponent;
  let fixture: ComponentFixture<PublicationsshowComponent>;

  beforeEach(async(() => {
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
