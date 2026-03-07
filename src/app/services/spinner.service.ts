import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private visibility$ = new BehaviorSubject<boolean>(false);

  get isVisible$(): Observable<boolean> {
    return this.visibility$.asObservable();
  }

  show() {
    this.visibility$.next(true);
  }

  hide() {
    this.visibility$.next(false);
  }
}
