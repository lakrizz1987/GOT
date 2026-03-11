import { createReducer, on } from '@ngrx/store';
import * as Actions from './characters.actions';
import { initialState } from './characters.state';

export const charactersReducer = createReducer(
    initialState,

    on(Actions.loadCharactersSuccess, (state, { characters }) => ({
        ...state,
        characters
    })),

    on(Actions.loadFavorites, (state) => ({
        ...state,
    })),

    on(Actions.addToFavorite, (state, { character }) => {
        const exists = state.favoritesCharacters.some(ch => ch.name === character.name);
        if (exists) {
            return state;
        }

        return {
            ...state,
            favoritesCharacters: [...state.favoritesCharacters, character]
        };
    }),

    on(Actions.removeFromFavorite, (state, { character }) => ({
        ...state,
        favoritesCharacters: state.favoritesCharacters.filter(ch => ch.name !== character.name)
    })),
    
    on(Actions.deleteCollection, (state) => ({
        ...state,
        characters: [],
        favoritesCharacters: []
    }))
);