import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilpadreComponent } from './perfilpadre.component';

xdescribe('PerfilpadreComponent', () => {
  let component: PerfilpadreComponent;
  let fixture: ComponentFixture<PerfilpadreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilpadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilpadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
