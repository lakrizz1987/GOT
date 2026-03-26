export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string | Date;
  characters: string[];
  povCharacters: string[];
}