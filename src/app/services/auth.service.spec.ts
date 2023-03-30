import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import {
  mockTestLoginResponse,
  mockTestRegisterResponse,
} from "../mocks/mocks-units-test";
import { AuthService } from "./auth.service";
import { Global } from "./global";

describe("AuthService", () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let url = Global.url;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientTestingModule, AuthService],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(authService).toBeTruthy();
  });

  it("should defined login method", () => {
    let mySpy = spyOn(authService, "login");
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
  });

  it("should defined register method", () => {
    let mySpy = spyOn(authService, "register");
    expect(mySpy).not.toBeNull;
    expect(mySpy).toBeTruthy();
    expect(mySpy).toBeDefined();
  });

  it("should return type response and request options in login", (doneFn) => {
    authService.login("test", "test").subscribe((data) => {
      expect(data).toEqual(mockTestLoginResponse);
      doneFn();
    });
    const req = httpTestingController.expectOne(url + "signin");
    req.flush(mockTestLoginResponse);
    expect(req.request.method).toEqual("POST");
    expect(req.request.url).toContain("signin");
  });

  it("should return type response and request options in register", (doneFn) => {
    authService.register("test", "test", "test").subscribe((data) => {
      expect(data).toEqual(mockTestRegisterResponse);
      doneFn();
    });
    const req = httpTestingController.expectOne(url + "signup");
    req.flush(mockTestRegisterResponse);
    expect(req.request.method).toEqual("POST");
    expect(req.request.url).toContain("signup");
  });
});
