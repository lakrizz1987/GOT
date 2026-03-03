import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { Character } from '../../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private baseUrl = 'https://anapioficeandfire.com/api';

  constructor(private http: HttpClient) { }

  getCharactersByBook(bookId: number, limit: number = 20): Observable<Character[]> {
    return this.http.get<{ characters: string[] }>(`https://anapioficeandfire.com/api/books/${bookId}`).pipe(
      mergeMap(book => {
        const characterUrls = book.characters.slice(0, limit);
        const requests: Observable<Character>[] = characterUrls.map(url => this.http.get<Character>(url));
        return forkJoin(requests);
      })
    );
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters?page=1&pageSize=100`);
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/characters/${id}`);
  }
}