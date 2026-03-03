import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import * as Actions from './store/characters.actions';
import { Character } from '../models/character.model';
import { CharactersService } from './services/characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent  {
   constructor(private store: Store<{ characters: any }>, private service: CharactersService) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.store.select(state => state.characters.characters).subscribe(data => {
      console.log(data);
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
