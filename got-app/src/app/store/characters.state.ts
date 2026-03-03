import { Character } from "../../models/character.model";


export interface CharactersState {
  characters: Character[];
  selectedCharacter: Character | null;
}

export const initialState: CharactersState = {
  characters: [],
  selectedCharacter: null
};