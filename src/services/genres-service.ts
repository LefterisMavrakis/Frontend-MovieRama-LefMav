import { mainApiGetRequest } from "./services-helper";

const ENDPOINT_MOVIE_GENRE = "/genre/movie/list";

const getMovieGenres = mainApiGetRequest(ENDPOINT_MOVIE_GENRE)

export {
  getMovieGenres
};
