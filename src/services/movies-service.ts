import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";
import { MoviesQueryString } from "@/interfaces/movies-interfaces";

const ENDPOINT_NOW_PLAYING = "/movie/now_playing";

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


export {
    getMoviesNowPlaying,
    getSimilarMovies
};
