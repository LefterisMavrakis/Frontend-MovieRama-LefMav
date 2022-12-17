import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";
import { MovieReviewsQueryString } from "@/interfaces/reviews-interfaces";

const getMovieReviews = (movieId: number , params: MovieReviewsQueryString ): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    mainApi
      .get(`/movie/${movieId}/reviews`, {
        params: params
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
};

export {
  getMovieReviews,
};
