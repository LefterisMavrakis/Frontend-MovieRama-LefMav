import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";
import { MovieVideoQueryString } from "@/interfaces/videos-interfaces";

const getMovieVideos = (movieId: number , params: MovieVideoQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(`/movie/${movieId}/videos`, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};

export {
  getMovieVideos,
};
