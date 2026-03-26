import { inject, Injectable } from "@angular/core";
import { CharactersService } from "../services/characters.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadCharacters, loadCharactersFailure, loadCharactersSuccess } from "./characters.actions";
import { catchError, EMPTY, map, of, switchMap, withLatestFrom } from "rxjs";
import { Router } from "@angular/router";
import { Paths } from "../enums/paths.enum";
import { Store } from "@ngrx/store";
import { AppState, selectAllCharacters } from "./characters.selector";


@Injectable()
export class CharactersEffect {
    private readonly actions$ = inject(Actions);
    private readonly router = inject(Router);
    private readonly characterService = inject(CharactersService);
    private readonly store = inject(Store<AppState>);
    private readonly bookNumber: number = 1;

    loadAllCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCharacters),
            withLatestFrom(this.store.select(selectAllCharacters)),

            switchMap(([action, characters]) => {
                if (characters && characters.length > 0) {
                    return EMPTY;
                }

                return this.characterService.getCharactersByBook(this.bookNumber).pipe(
                    map(characters => loadCharactersSuccess({ characters })),
                    catchError(() => {
                        this.router.navigate([Paths.INTERNAL_ERROR]);
                        return of(loadCharactersFailure());
                    })
                );
            })
        )
    );
}