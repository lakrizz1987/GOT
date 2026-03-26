import { createSelector } from "@ngrx/store";
import { CharactersState } from "./characters.state";

export interface AppState {
    charactersStore: CharactersState;
}

export const selectCharactersState = (state: AppState) => state.charactersStore;
export const selectFavorites = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.favoritesCharacters
);

export const selectAllCharacters = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.characters
)