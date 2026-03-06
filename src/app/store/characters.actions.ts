import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';

export const loadCharacters = createAction('[Characters] Load Characters');

export const loadCharactersSuccess = createAction(
    '[Characters] Load Characters Success',
    props<{ characters: Character[] }>()
);
export const addToFavorite = createAction(
    '[Characters] Add to Favorite',
    props<{ character: Character }>()
);
export const removeFromFavorite = createAction(
    '[Characters] Remove from Favorite',
    props<{ character: Character }>()
);
export const loadFavorites = createAction(
    '[Characters] Load Favorite',
);

