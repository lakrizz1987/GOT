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
  @Input() characters: Character[] = [];
  characterImageMap = CHARACTER_IMAGES;
}
