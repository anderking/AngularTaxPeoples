import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaseditComponent } from './rutasedit.component';

xdescribe('RutaseditComponent', () => {
  let component: RutaseditComponent;
  let fixture: ComponentFixture<RutaseditComponent>;

  beforeEach(waitForAsync(() => {
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
