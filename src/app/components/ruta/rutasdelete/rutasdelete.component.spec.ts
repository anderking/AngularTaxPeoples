import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasdeleteComponent } from './rutasdelete.component';

describe('RutasdeleteComponent', () => {
  let component: RutasdeleteComponent;
  let fixture: ComponentFixture<RutasdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
