import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasshowComponent } from './rutasshow.component';

xdescribe('RutasshowComponent', () => {
  let component: RutasshowComponent;
  let fixture: ComponentFixture<RutasshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
