import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import * as Actions from '../../store/characters.actions';
import { Subscription } from 'rxjs';
import { CharactersState } from '../../store/characters.state';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private readonly store: Store<{ charactersStore: CharactersState }>,
    private readonly service: CharactersService,
  ) { }

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
    this.service.getCharactersByBook(1).subscribe({
      next: (data: Character[]) => {
        this.store.dispatch(Actions.loadCharactersSuccess({ characters: data }));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
