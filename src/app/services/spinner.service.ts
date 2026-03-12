import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for managing the global loading spinner state.
 * Uses a counter to track active HTTP requests, ensuring 
 * the spinner remains visible until the last request has completed.
 */
export class SpinnerService {
  private activeRequests = 0;
  private readonly visibility$ = new BehaviorSubject<boolean>(false);

  get isVisible$(): Observable<boolean> {
    return this.visibility$.asObservable();
  }

  show() {
    this.activeRequests++;
    this.updateVisibility(true);
  }

  hide() {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.updateVisibility(false);
    }
  }

  private updateVisibility(visible: boolean) {
    this.visibility$.next(visible);
  }
}
