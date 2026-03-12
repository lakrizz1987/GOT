import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './nav.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const isLoggedInSubject = new BehaviorSubject<boolean>(false);

  const authServiceMock = {
    isLoggedIn$: isLoggedInSubject.asObservable(),
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Log in" and "Register" when user is NOT logged in', () => {
    isLoggedInSubject.next(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.textContent;

    expect(links).toContain('Log in');
    expect(links).toContain('Register');
    expect(links).not.toContain('Logout');
  });

  it('should show "Logout" and "Favorites" when user IS logged in', () => {
    isLoggedInSubject.next(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.textContent;

    expect(links).toContain('Logout');
    expect(links).toContain('Favorites');
    expect(links).not.toContain('Log in');
  });
});
