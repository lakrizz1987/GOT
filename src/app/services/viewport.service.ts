import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private isDesktopSubject = new BehaviorSubject<boolean>(false);
  public isDesktop$: Observable<boolean> = this.isDesktopSubject.asObservable();

  private minTabletWidth = 768;
  private targetId = 'measure-container';

  constructor() {
    this.checkWidth();
    window.addEventListener('resize', () => this.checkWidth());
  }

  private checkWidth() {
    const div = document.getElementById(this.targetId);
    if (!div) return;

    const width = div.offsetWidth;
    this.isDesktopSubject.next(width >= this.minTabletWidth);
  }
}