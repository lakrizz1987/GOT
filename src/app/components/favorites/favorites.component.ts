import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../models/character.model';
import * as Actions from '../../store/characters.actions'
import { CharactersState } from '../../store/characters.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteCharacters: Character[] = [];
  subscriptions: Subscription[] = []

  constructor(
    private readonly store: Store<{ charactersStore: CharactersState }>
  ) { }

  ngOnInit() {
    this.store.dispatch(Actions.loadFavorites());
    const sub = this.store.select(state => state.charactersStore.favoritesCharacters).subscribe(favorites => {
      this.favoriteCharacters = favorites;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
