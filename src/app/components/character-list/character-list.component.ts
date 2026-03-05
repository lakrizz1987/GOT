import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';
import { CHARACTER_IMAGES } from '../../services/characters.service';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

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

  goToHeroDetails(url: string) {
    const id = this.extractHeroId(url);
    this.router.navigate(['/details/' + id]);
  }

  extractHeroId(url: string) {
    const id = url.split('/').pop();
    return id;
  }
}
