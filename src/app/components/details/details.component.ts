import { Component, OnDestroy, OnInit } from '@angular/core';
import { CHARACTER_IMAGES, CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/characters.actions';
import { CharactersState } from '../../store/characters.state';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  characterImageMap = CHARACTER_IMAGES;
  character: Character | null = null;
  characterId: string = '';
  bookNames: string[] = [];
  isFavorite: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly characterService: CharactersService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly store: Store<{ charactersStore: CharactersState }>,
    public readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.characterId) {
      this.setCharacterData();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * - Uses `combineLatest` to reactively track both the API data and the Store's favorite list.
   * - When either source emits a value, it updates the character details and recalculates 
   * the 'isFavorite' status automatically.
   * - Fetches related book names in parallel using `forkJoin` if they haven't been loaded yet.
   */
  private setCharacterData() {
    const character$ = this.characterService.getCharacterById(this.characterId);
    const favorites$ = this.store.select(state => state.charactersStore.favoritesCharacters);
    const sub = combineLatest([character$, favorites$]).subscribe(([character, favorites]) => {
      this.character = character;
      this.isFavorite = favorites.some(fav => fav.name === this.character?.name);

      if (this.bookNames.length === 0 && character.books?.length > 0) {
        const bookRequests = character.books.map(url => this.characterService.getCharacterBooks(url));
        forkJoin(bookRequests).subscribe(books => this.bookNames = books.map(b => b.name));
      }
    });
    this.subscriptions.push(sub);
  }

  addToFavorite(character: Character) {
    this.store.dispatch(Actions.addToFavorite({ character }));
    this.isFavorite = true;
  }

  removeFromFavorites(character: Character) {
    this.store.dispatch(Actions.removeFromFavorite({ character }));
    this.isFavorite = false;
  }

  goBack() {
    this.location.back()
  }
}
