import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsusersComponent } from './projectsusers.component';

describe('ProjectsusersComponent', () => {
  let component: ProjectsusersComponent;
  let fixture: ComponentFixture<ProjectsusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
