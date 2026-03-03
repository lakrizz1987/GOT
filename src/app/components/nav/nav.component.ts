import { Component, OnInit } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isDesktop: boolean = false;

  constructor(
    private viewportService: ViewportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.viewportService.isDesktop$.subscribe(isDesktop => {
      this.isDesktop = isDesktop;
      this.menuOpen = false;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goTo(path: string, event: Event) {
    event.preventDefault();
    this.router.navigate([path]);
    this.toggleMenu();
  }
}
