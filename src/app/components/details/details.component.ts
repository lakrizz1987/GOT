import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, map, of, Subscription, switchMap } from 'rxjs';
import { Character } from '../../models/character.model';
import { AuthService } from '../../services/auth.service';
import { CHARACTER_IMAGES, CharactersService } from '../../services/characters.service';
import * as Actions from '../../store/characters.actions';
import { CharactersState } from '../../store/characters.state';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private characterId: string = '';
  private subscriptions: Subscription[] = [];
  characterImageMap = CHARACTER_IMAGES;
  character: Character | null = null;
  bookNames: string[] = [];
  isFavorite: boolean = false;

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
    const sub = combineLatest([character$, favorites$]).pipe(
      switchMap(([character, favorites]) => {
        this.character = character;
        this.isFavorite = favorites.some(fav => fav.name === this.character?.name);

        if (this.bookNames.length === 0 && character.books?.length > 0) {
          const bookRequests = character.books.map(url => this.characterService.getCharacterBooks(url));
          return forkJoin(bookRequests).pipe(
            map(books => books.map(b => b.name))
          );
        } else {
          return of(this.bookNames)
        }
      })
    ).subscribe(bookNames => this.bookNames = bookNames);

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
