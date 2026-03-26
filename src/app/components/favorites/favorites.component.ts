import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../models/character.model';
import * as Actions from '../../store/characters.actions'
import { CharactersState } from '../../store/characters.state';
import { Observable, Subscription } from 'rxjs';
import { selectFavorites } from '../../store/characters.selector';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favoriteCharacters$: Observable<Character[]>;

  constructor(
    private readonly store: Store<{ charactersStore: CharactersState }>
  ) {
    this.favoriteCharacters$ = this.store.select(selectFavorites);
  }
}
