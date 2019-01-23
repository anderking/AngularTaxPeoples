import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectspadreComponent } from './projectspadre.component';

describe('ProjectspadreComponent', () => {
  let component: ProjectspadreComponent;
  let fixture: ComponentFixture<ProjectspadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectspadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectspadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
