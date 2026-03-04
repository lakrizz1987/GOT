import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import * as Actions from '../../store/characters.actions';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit{

  characters: Character[] = [];
  constructor(
    private store: Store<{ characters: any }>,
    private service: CharactersService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
    this.store.select(state => state.characters.characters).subscribe(data => {
      console.log(data);
      this.characters = data;
    });
  }

  loadCharacters(): void {
    this.service.getCharactersByBook(1).subscribe({
      next: (data: Character[]) => {
        this.store.dispatch(Actions.loadCharactersSuccess({ characters: data }));
      },
      error: (err) => {
        this.store.dispatch(Actions.loadFailure({ error: err }));

      }
    });
  }
}
