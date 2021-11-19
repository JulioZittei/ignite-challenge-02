import { render } from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import response from '../server.json';

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
      return this.db.genres;
    });

    this.get('/movies', (_, request) => {
      const { Genre_id } = request.queryParams;
      const response = this.db.movies.where({ Genre_id: Genre_id });
      return response.length > 0 ? response : this.db.movies;
    });

    this.get('/genres/:id', (_, request) => {
      const { id } = request.params;
      return this.db.genres.findBy({ id: id });
    });

    this.get('/movies/:id', (_, request) => {
      const id = request.params.id;
      return this.db.movies.findBy({ id: id });
    });
  },
});

render(<App />, document.getElementById('root'));
