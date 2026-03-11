import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Paths } from '../enums/paths.enum';
import { Store } from '@ngrx/store';
import { CharactersState } from '../store/characters.state';
import * as Actions from '../store/characters.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store<{ charactersStore: CharactersState }>
  ) { }

  hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  register(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, { username, password }, { responseType: 'text' });
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.store.dispatch(Actions.deleteCollection());
    this.isLoggedInSubject.next(false);
    this.router.navigate([Paths.CHARACTERS]);
  }
}