import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaspadreComponent } from './rutaspadre.component';

xdescribe('RutaspadreComponent', () => {
  let component: RutaspadreComponent;
  let fixture: ComponentFixture<RutaspadreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaspadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaspadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
