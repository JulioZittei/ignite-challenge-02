import { render } from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import response from '../server.json';
import { MovieCard } from './components/MovieCard';

type MovieProps = {
  Genre_id: number;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

createServer({
  models: {
    genre: Model,
    movie: Model,
  },

  seeds(server) {
    server.db.loadData({
      genres: response.genres,
      movies: response.movies,
    });
  },
  routes() {
    this.namespace = 'api';

    this.get('/genres', () => {
      return this.schema.all('genre');
    });

    this.get('/movies', (schema, request) => {
      const id = request.queryParams.Genre_id;
      return schema.where('movie', { Genre_id: id });
    });

    this.get('/genres/:id', (schema, request) => {
      const { id } = request.params;
      return schema.findBy('genre', { id: id });
    });

    this.get('/movies/:id', (schema, request) => {
      const id = request.params.id;
      return schema.where('movie', (movie) => movie.id === id);
    });
  },
});

render(<App />, document.getElementById('root'));
