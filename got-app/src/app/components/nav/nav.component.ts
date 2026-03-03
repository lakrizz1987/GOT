import { Component, OnInit } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';

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
    private viewportService: ViewportService
  ) { }

  ngOnInit() {
    this.viewportService.isDesktop$.subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
