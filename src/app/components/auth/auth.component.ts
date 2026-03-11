import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  isLoginFlow: boolean = true;
  paths = Paths;
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  invalidCredential: string = '';
  
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoginFlow = this.router.url.includes(this.paths.LOGIN);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoginFlow) {
      this.onLogin();
    }
  }

  onLogin() {
    this.invalidCredential = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate([this.paths.CHARACTERS]);
      },
      error: (err: any) => {
        console.log(err)
        if (err.error === 'Invalid credentials') {
          this.invalidCredential = err.error;
        }else {
          this.router.navigate([this.paths.INTERNAL_ERROR]);
        }
      }
    });
  }
}
