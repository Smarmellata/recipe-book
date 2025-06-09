import { TestBed } from "@angular/core/testing";
import { SpinnerService } from "./spinner.service";

describe("SpinnerService", () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should emit true when show is called", (done) => {
    service.loading$.subscribe((value) => {
      if (value === true) {
        expect(value).toBeTrue();
        done();
      }
    });
    service.show();
  });

  it("should emit false when hide is called", (done) => {
    service.show(); // set to true first
    service.loading$.subscribe((value) => {
      if (value === false) {
        expect(value).toBeFalse();
        done();
      }
    });
    service.hide();
  });
});
