import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { Errors } from '../../enums/error.enum';
import { Paths } from '../../enums/paths.enum';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    spyOnProperty(router, 'url', 'get').and.returnValue('/login');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoginFlow to true if URL includes login', () => {
    expect(component.isLoginFlow).toBeTrue();
  });

  it('should show error if fields are empty on login', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toBe(Errors.ALL_FIELDS_REQUIRED);
  });

  it('should navigate to characters on successful login', () => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));
    component.username = 'ivan';
    component.password = '1234';
    component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith([Paths.CHARACTERS]);
  });

  it('should display "Join the Nights Watch" on the button when in register mode', () => {
    component.isLoginFlow = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonText = compiled.querySelector('button .text')?.textContent;

    expect(buttonText).toBe('Join the Nights Watch');
  });
});
