import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';
import { CHARACTER_IMAGES } from '../../services/characters.service';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { SpinnerService } from '../../services/spinner.service';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set characters(data: Character[]) {
    this.allCharacters = data;
    this.filteredCharacters = data;
  }
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef<HTMLInputElement> | undefined;
  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  characterImageMap = CHARACTER_IMAGES;
  imgLoaded: boolean = false;
  isFavoritesPage: boolean = true;
  private searchSubscription: Subscription | null = null;

  constructor(
    private readonly router: Router,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.isFavoritesPage = this.router.url.includes(Paths.FAVORITES);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.inputElement) {
        return;
      }

      this.searchSubscription = fromEvent(this.inputElement.nativeElement, 'input')
        .pipe(
          map(event => (event.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => {
          this.filterCharacters(value);
        });
    }, 500);
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  filterCharacters(value: string) {
    const searchText = value.trim().toLowerCase();

    if (!searchText) {
      this.filteredCharacters = this.allCharacters;
      return;
    }

    this.filteredCharacters = this.allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchText)
    );
  }

  goToHeroDetails(url: string) {
    const id = this.extractHeroId(url);
    this.router.navigate(['/', Paths.DETAILS, id]);
  }

  extractHeroId(url: string) {
    const id = url.split('/').pop();
    return id;
  }
}
