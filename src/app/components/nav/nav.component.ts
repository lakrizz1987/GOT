import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavbarComponent {
  menuOpen: boolean = false;
  isDesktop: boolean = false;

  constructor(
    private router: Router
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
