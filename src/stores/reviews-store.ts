import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { ref } from 'vue'
import useConfig from '@/composables/use-config';
import { MovieReview, MovieReviewsFetchParams, MovieReviewsQueryString } from '@/interfaces/reviews-interfaces';
import { getMovieReviews } from '@/services/reviews-service';

export default function useReviewStore() {
    const {getApiKey} = useConfig()
    const movieReviews = ref<MovieReview[]>([])
    const movieReviewsLoading = ref<boolean>(false)

    const fetchMovieReviews = (movieId: number, params?: MovieReviewsFetchParams): Promise<AxiosResponse> => {
        return new Promise((resolve, reject)=>{
            movieReviewsLoading.value = true
            const paramsToSend: MovieReviewsQueryString = {
                api_key: getApiKey(),
            }
            if(typeof params !== 'undefined' && typeof params.language !== 'undefined') {
                paramsToSend.language = params.language
            }
            getMovieReviews(movieId, paramsToSend).then((res: AxiosResponse) => {
                movieReviews.value = res.data.results
                movieReviewsLoading.value = false
                resolve(res.data)
            }).catch((err: AxiosError)=>{
                movieReviewsLoading.value = false
                reject(err)
            })
        })
    }
    
    return {
        fetchMovieReviews,
        movieReviews,
        movieReviewsLoading,
    };
  }