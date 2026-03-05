import { Component, OnInit } from '@angular/core';
import { CHARACTER_IMAGES, CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  character: Character | null = null;
  characterId: string = '';
  characterImageMap = CHARACTER_IMAGES;
  bookNames: string[] = [];

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id') || '';
    this.characterService.getCharacterById(this.characterId).subscribe(hero => {
      this.character = hero;

      if (hero.books && hero.books.length > 0) {
        const bookRequests = hero.books.map(bookUrl => this.characterService.getCharacterBooks(bookUrl));

        forkJoin(bookRequests).subscribe(books => {
          this.bookNames = books.map(b => b.name);
        });
      }
    });
  }
}
