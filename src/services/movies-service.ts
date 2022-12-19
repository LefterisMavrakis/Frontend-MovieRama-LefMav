import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";
import { MoviesQueryString, MoviesSearchQueryString } from "@/interfaces/movies-interfaces";

const ENDPOINT_NOW_PLAYING = "/movie/now_playing";
const ENDPOINT_SEARCH = "/search/movie";

const getMoviesNowPlaying = (params: MoviesQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(ENDPOINT_NOW_PLAYING, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};
const getSimilarMovies = (movieId: number,params: MoviesQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(`/movie/${movieId}/similar`, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};

const searchMovies = (params: MoviesSearchQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(ENDPOINT_SEARCH, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};

export {
    getMoviesNowPlaying,
    getSimilarMovies,
    searchMovies
};
