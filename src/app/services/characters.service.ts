import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private baseUrl = 'https://anapioficeandfire.com/api';

  constructor(private readonly http: HttpClient) { }

  getCharactersByBook(bookId: number, limit: number = 20): Observable<Character[]> {
    return this.http.get<{ characters: string[] }>(`https://anapioficeandfire.com/api/books/${bookId}`).pipe(
      mergeMap(book => {
        const characterUrls = book.characters.slice(0, limit);
        const requests: Observable<Character>[] = characterUrls.map(url => this.http.get<Character>(url));
        return forkJoin(requests);
      })
    );
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/characters/${id}`);
  }

  getCharacterBooks(bookUrl: string) {
    return this.http.get<any>(bookUrl);
  }
}

export const CHARACTER_IMAGES: { [key: string]: string } = {
  'Walder': '/assets/heroes/walder.webp',
  'Balon Greyjoy': '/assets/heroes/balon-greyjoy.webp',
  'Margaery Tyrell': '/assets/heroes/margaery-tyrell.webp',
  'Mordane': '/assets/heroes/mordane.webp',
  'Tywin Lannister': '/assets/heroes/tywin-lannister.webp',
  'Aegon I': '/assets/heroes/aegon-1.webp',
  'Aegon II': '/assets/heroes/aegon-2.webp',
  'Aegon III': '/assets/heroes/aegon-3.webp',
  'Aegon Targaryen': '/assets/heroes/aegon-targaryen.webp',
  'Aegon V': '/assets/heroes/aegon-5.webp',
  'Aenys Frey': '/assets/heroes/aenys-frey.webp',
  'Aeron Greyjoy': '/assets/heroes/aeron-greyjoy.webp',
  'Aerys II': '/assets/heroes/aerys-2.webp',
  'Alannys Harlaw': '/assets/heroes/alannys-harlaw.webp',
  'default': '/assets/heroes/default.webp'
};