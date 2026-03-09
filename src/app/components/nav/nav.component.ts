import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavbarComponent {
  menuOpen: boolean = false;
  isDesktop: boolean = false;
  paths = Paths;

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goTo(path: string, event: Event) {
    event.preventDefault();
    this.router.navigate([path]);
    this.menuOpen = false;
  }
}
