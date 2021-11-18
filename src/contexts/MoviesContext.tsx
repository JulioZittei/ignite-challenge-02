import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextProviderData {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
}

interface MoviesContextProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextProviderData);

export function MoviesContextProvider({ children }: MoviesContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get('genres').then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  useEffect(() => {
    api.get(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data.movies);
    });

    api.get(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data.genre);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        selectedGenreId,
        selectedGenre,
        handleClickButton,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
