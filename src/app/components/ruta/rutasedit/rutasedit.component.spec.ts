import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaseditComponent } from './rutasedit.component';

describe('RutaseditComponent', () => {
  let component: RutaseditComponent;
  let fixture: ComponentFixture<RutaseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
