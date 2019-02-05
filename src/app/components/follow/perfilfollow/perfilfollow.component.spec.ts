import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilfollowComponent } from './perfilfollow.component';

describe('PerfilfollowComponent', () => {
  let component: PerfilfollowComponent;
  let fixture: ComponentFixture<PerfilfollowComponent>;

  beforeEach(async(() => {
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
