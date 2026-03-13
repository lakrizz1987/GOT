import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CharactersComponent } from './characters.component';
import { CharactersService } from '../../services/characters.service';
import { of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';


describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let serviceSpy: jasmine.SpyObj<CharactersService>;
  let store: MockStore;

  const mockCharacters = [
    { id: 1, name: 'Jon Snow', house: 'Stark' },
    { id: 2, name: 'Daenerys Targaryen', house: 'Targaryen' }
  ];

  const initialState = {
    charactersStore: { characters: [] }
  };

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('CharactersService', ['getCharactersByBook']);

    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      providers: [
        { provide: CharactersService, useValue: serviceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service if store is empty', () => {
    serviceSpy.getCharactersByBook.and.returnValue(of(mockCharacters as any));
    fixture.detectChanges();

    expect(serviceSpy.getCharactersByBook).toHaveBeenCalled();
  });

  it('should navigate to internal error page when service fails', () => {
    const router = TestBed.inject(Router);
    serviceSpy.getCharactersByBook.and.returnValue(throwError(() => new Error('Server Down')));
    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['internalError']);
  });
});
