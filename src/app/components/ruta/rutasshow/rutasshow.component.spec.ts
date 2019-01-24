import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasshowComponent } from './rutasshow.component';

describe('RutasshowComponent', () => {
  let component: RutasshowComponent;
  let fixture: ComponentFixture<RutasshowComponent>;

  beforeEach(async(() => {
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
