import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';

export const loadCharacters = createAction('[Characters] Load Characters');

export const loadCharactersSuccess = createAction(
    '[Characters] Load Characters Success',
    props<{ characters: Character[] }>()
);

export const loadCharacterById = createAction(
    '[Characters] Load Character By Id',
    props<{ id: string }>()
);

export const loadCharacterByIdSuccess = createAction(
    '[Characters] Load Character By Id Success',
    props<{ character: Character }>()
);

export const loadFailure = createAction(
    '[Characters] Load Failure',
    props<{ error: any }>()
);