import { Component, HostListener, Renderer2 } from '@angular/core';
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
  paths = Paths;

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService,
    private readonly renderer: Renderer2
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  goTo(path: string, event: Event) {
    event.preventDefault();
    this.router.navigate([path]);
    this.closeMenuAndRemoveNoScroll();
  }

  private closeMenuAndRemoveNoScroll() {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.closeMenuAndRemoveNoScroll();
  }
}
