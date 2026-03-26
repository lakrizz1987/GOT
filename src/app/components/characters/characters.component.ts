import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../models/character.model';
import { Observable } from 'rxjs';
import { CharactersState } from '../../store/characters.state';
import { loadCharacters } from '../../store/characters.actions';
import { selectAllCharacters } from '../../store/characters.selector';


@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {

  characters$: Observable<Character[]>;
  constructor(
    private readonly store: Store<{ charactersStore: CharactersState }>,
  ) {
    this.characters$ = this.store.select(selectAllCharacters);
  }

  ngOnInit() {
    this.store.dispatch(loadCharacters());
  }
}
