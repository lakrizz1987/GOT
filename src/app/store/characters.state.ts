import { Character } from "../models/character.model";

export interface CharactersState {
  characters: Character[];
  favoritesCharacters: Character[];
}

export const initialState: CharactersState = {
  characters: [],
  favoritesCharacters: []
};