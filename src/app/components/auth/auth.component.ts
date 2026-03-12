import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { AuthService } from '../../services/auth.service';
import { Errors } from '../../enums/error.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  isLoginFlow: boolean = true;
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';
  paths = Paths;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoginFlow = this.router.url.includes(this.paths.LOGIN);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoginFlow ? this.onLogin() : this.onRegister();
  }

  onRegister() {
    if (!this.username || !this.password || !this.repeatPassword) {
      this.errorMessage = Errors.ALL_FIELDS_REQUIRED;
      return;
    }

    if (this.password === this.repeatPassword) {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          this.onLogin();
        },
        error: (err: HttpErrorResponse) => {
          if (err.error === Errors.USER_EXIST) {
            this.errorMessage = err.error;
          } else {
            this.router.navigate([this.paths.INTERNAL_ERROR]);
          }
        }
      })
    } else {
      this.errorMessage = Errors.PASS_NOT_MATCH;
    }
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = Errors.ALL_FIELDS_REQUIRED;
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate([this.paths.CHARACTERS]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error === Errors.INVALID_CREDENTIALS) {
          this.errorMessage = err.error;
        } else {
          this.router.navigate([this.paths.INTERNAL_ERROR]);
        }
      }
    });
  }
}
