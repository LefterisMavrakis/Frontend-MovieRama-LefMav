import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";
import { MovieGenreQueryString } from "@/interfaces/genres-interfaces";

const ENDPOINT_MOVIE_GENRE = "/genre/movie/list";

const getMovieGenres = (params: MovieGenreQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(ENDPOINT_MOVIE_GENRE, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};

export {
  getMovieGenres,
};
