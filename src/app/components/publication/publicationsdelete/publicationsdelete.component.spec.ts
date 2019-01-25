import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsdeleteComponent } from './publicationsdelete.component';

describe('PublicationsdeleteComponent', () => {
  let component: PublicationsdeleteComponent;
  let fixture: ComponentFixture<PublicationsdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
