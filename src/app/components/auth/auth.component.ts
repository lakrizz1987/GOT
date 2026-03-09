import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  isLoginFlow: boolean = true;
  paths = Paths;
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.isLoginFlow = this.router.url.includes(this.paths.LOGIN);
  }

}
