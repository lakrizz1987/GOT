import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import * as Actions from './store/characters.actions';
import { Character } from './models/character.model';
import { CharactersService } from './services/characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent  {}
