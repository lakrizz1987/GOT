import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';
import { CHARACTER_IMAGES } from '../../services/characters.service';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  @Input() set characters(data: Character[]) {
    this.allCharacters = data;
    this.filteredCharacters = data;
  }
  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  characterImageMap = CHARACTER_IMAGES;

  onSearch(event: Event) {
    const value = (event.target as HTMLFormElement)['value'].trim().toLowerCase();

    if (!value) {
      this.filteredCharacters = this.allCharacters;
      return;
    }

    this.filteredCharacters = this.allCharacters.filter(character =>
      character.name.toLowerCase().includes(value)
    );
  }
}
