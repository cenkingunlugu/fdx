import { waitForAsync, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { throwError } from 'rxjs';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AppComponent ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('happy flows', () => {
    it('should be valid and make a request to api', () => {
      component.userInfo.setValue({
        "name": "Name", 
        "surname": "Surname", 
        "email": "email@test.co", 
        "password": "passWOrd", 
      });
      
      const controls = component.userInfo.controls;

      for (const control in controls) {
          // Clear sync validators - use clearAsyncValidators() for async
          // validators
          controls[control].clearValidators();
          // should update just the control and not everything
          controls[control].updateValueAndValidity({ onlySelf: true });
      }
      component.userInfo.updateValueAndValidity();
      
      component.onClickSubmit();
      const req = httpMock.expectOne('https://demo-api.now.sh/users');
      expect(req.request.method).toBe("POST");
      req.flush({success: true});  
      expect(component.submissionSuccesful).toBeTruthy();    
    });

    it('should show error message if api throws error', () => {
      component.userInfo.setValue({
        "name": "Name", 
        "surname": "Surname", 
        "email": "email@test.co", 
        "password": "passWOrd", 
      });
      
      const controls = component.userInfo.controls;

      for (const control in controls) {
          // Clear sync validators - use clearAsyncValidators() for async
          // validators
          controls[control].clearValidators();
          // should update just the control and not everything
          controls[control].updateValueAndValidity({ onlySelf: true });
      }
      component.userInfo.updateValueAndValidity();
      
      component.onClickSubmit();
      httpMock.expectOne('https://demo-api.now.sh/users').error(new ProgressEvent('network error'));
      expect(component.submissionSuccesful).toBeFalsy();
    });
    it('should not be able to make a request to api when invalid', () => {
      component.userInfo.setValue({
        "name": "", 
        "surname": "Surname", 
        "email": "email@test.co", 
        "password": "passWOrd", 
      });
      
      
      component.onClickSubmit();
      const req = httpMock.expectNone('https://demo-api.now.sh/users');    
    });
  });
  describe('unhappy flows', () => {
    it('should show name required error', () => {
      component.userInfo.setValue({
        "name": "", 
        "surname": "tes", 
        "email": "email@test.co", 
        "password": "passWOrd", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['name'].hasError('required')).toEqual(true);
    });
    it('should show surname required error', () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "", 
        "email": "email@test.co", 
        "password": "passWOrd", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['surname'].hasError('required')).toEqual(true);
    });
    it('should show email required error', () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "tes", 
        "email": "", 
        "password": "passWOrd", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['email'].hasError('required')).toEqual(true);
    });

    it('should show email format error', () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "tes", 
        "email": "test", 
        "password": "passWOrd", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['email'].hasError('required')).toEqual(false);
      expect(component.userInfo.controls['email'].hasError('email')).toEqual(true);
    });

    it('should show password required error', () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "tes", 
        "email": "test@tes.co", 
        "password": "", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('required')).toEqual(true);
    });

    it('should show password length error', () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "tes", 
        "email": "test@tes.co", 
        "password": "passWOr", 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('required')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('minlength')).toEqual(true);
    });
    it("should show password update error if no uppercase", () => {
        component.userInfo.setValue({
          "name": "tes", 
          "surname": "tes", 
          "email": "test@tes.co", 
          "password": 'password', 
        });
    
        expect(component.userInfo.valid).toEqual(false);
        expect(component.userInfo.controls['password'].hasError('required')).toEqual(false);
        expect(component.userInfo.controls['password'].hasError('minlength')).toEqual(false);
        expect(component.userInfo.controls['password'].hasError('upperAndLower')).toEqual(true);
    });

    it("should show password update error if no lowercase", () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "tes", 
        "email": "test@tes.co", 
        "password": 'UPPERCASE', 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('required')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('minlength')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('upperAndLower')).toEqual(true);
    });

    it("should show password update error if password contains name", () => {
      component.userInfo.setValue({
        "name": "tes", 
        "surname": "test", 
        "email": "test@tes.co", 
        "password": 'nameWord', 
      });
  
      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('required')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('minlength')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('upperAndLower')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('noNameSurname')).toEqual(true);

  });

  it("should show password update error if password contains surname", () => {
      component.userInfo.setValue({
        "name": "test", 
        "surname": "tes", 
        "email": "test@tes.co", 
        "password": 'tesPERCASE', 
      });

      expect(component.userInfo.valid).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('required')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('minlength')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('upperAndLower')).toEqual(false);
      expect(component.userInfo.controls['password'].hasError('noNameSurname')).toEqual(true);
    });
    
  });
  afterEach(() => {
    httpMock.verify();
  });
});

