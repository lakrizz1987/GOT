import { createReducer, on } from '@ngrx/store';
import * as Actions from './characters.actions';
import { initialState } from './characters.state';

export const charactersReducer = createReducer(
    initialState,

    on(Actions.loadCharactersSuccess, (state, { characters }) => ({
        ...state,
        characters
    })),

    on(Actions.loadCharacterByIdSuccess, (state, { character }) => ({
        ...state,
        selectedCharacter: character
    })),

    on(Actions.loadFailure, (state, { error }) => ({
        ...state,
        characters: [],
        selectedCharacter: null
    }))
);