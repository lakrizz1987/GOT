import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';

export const loadCharacters = createAction(
    '[Characters] Load Characters',
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
export const deleteCollection = createAction(
    '[Characters] Delete collections'
)

