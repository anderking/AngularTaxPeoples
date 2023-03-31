import { HttpClientModule } from "@angular/common/http";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/services/auth.service";
import { appRoutes } from "./../../../app.routing";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [HttpClientModule, AuthService],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("the form must be valid", () => {
    component.loginForm.form.reset({
      email: "test@test.com",
      password: "123456789",
    });
    expect(component.loginForm.form.valid).toBeTruthy();
  });

  it("should call login from service", () => {
    component = fixture.componentInstance;
    let mySpy = spyOn(authService, "login").and.callThrough();
    authService.login("", "");
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalled();
  });

  it("should defined login method", () => {
    component = fixture.componentInstance;
    let mySpy = spyOn(component, "login");
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
  });
});
