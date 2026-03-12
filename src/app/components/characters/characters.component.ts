import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Actions from '../../store/characters.actions';
import { Store } from '@ngrx/store';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { Subscription } from 'rxjs';
import { CharactersState } from '../../store/characters.state';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';


@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnDestroy {
  private bookNumber: number = 1;
  private subscriptions: Subscription[] = [];
  characters: Character[] = [];
  constructor(
    private readonly store: Store<{ charactersStore: CharactersState }>,
    private readonly service: CharactersService,
    private readonly router: Router
  ) { }

  /**
   * Initializes the component and sets up the data stream.
   * 1. Subscribes to the 'characters' state from the Store.
   * 2. Automatically updates the local 'characters' array whenever the Store changes.
   * 3. Triggers an API call only if the Store is empty (to avoid redundant network requests).
   */
  ngOnInit() {
    const sub = this.store.select(state => state.charactersStore.characters)
      .subscribe(characters => {
        this.characters = characters;

        if (characters.length === 0) {
          this.loadCharacters();
        }
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadCharacters() {
    this.service.getCharactersByBook(this.bookNumber).subscribe({
      next: (data: Character[]) => {
        this.store.dispatch(Actions.loadCharacters({ characters: data }));
      },
      error: (err) => {
        this.router.navigate([Paths.INTERNAL_ERROR]);
      }
    });
  }
}
