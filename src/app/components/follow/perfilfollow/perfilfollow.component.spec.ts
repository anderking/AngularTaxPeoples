import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilfollowComponent } from './perfilfollow.component';

xdescribe('PerfilfollowComponent', () => {
  let component: PerfilfollowComponent;
  let fixture: ComponentFixture<PerfilfollowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
