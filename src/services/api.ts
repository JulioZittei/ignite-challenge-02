import axios from 'axios';

const env =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://ignite-challenge-02.netlify.app/api';

export const api = axios.create({
  baseURL: `${env}`,
});
