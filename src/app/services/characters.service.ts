import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly baseUrl = 'https://anapioficeandfire.com/api';

  constructor(
    private readonly http: HttpClient
  ) { }
  /**
   * Fetches characters from a specific book.
   * 1. Gets the book details to obtain the list of character URLs.
   * 2. Uses `mergeMap` to switch from the book stream to a character stream.
   * 3. Uses `forkJoin` to execute multiple character requests in parallel.
   * @param bookId The ID of the book (e.g., 1 for "A Game of Thrones").
   * @param limit How many characters to fetch (default is 20).
   * @returns An Observable array of Character objects.
   */
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

  getCharacterBooks(bookUrl: string): Observable<Book> {
    return this.http.get<Book>(bookUrl);
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