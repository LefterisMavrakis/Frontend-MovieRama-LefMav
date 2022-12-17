import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { getMoviesNowPlaying, getSimilarMovies } from "@/services/movies-service";
import { ref, computed } from 'vue'
import { Movie, MoviesQueryString, MoviesFetchParams } from "@/interfaces/movies-interfaces";
import useConfig from '@/composables/use-config';

const moviesNowPlaying = ref<Movie[]>([])
const moviesNowPlayingPage = ref<number>(0)
const moviesNowPlayingTotalPages = ref<number>(0)
const moviesNowPlayingLoading = ref<boolean>(true)
const moviesNowPlayingHasNextPage = computed(() => {
    return moviesNowPlayingTotalPages.value > moviesNowPlayingPage.value
})

export default function useMoviesStore() {
    const {getApiKey} = useConfig()
    const moviesSimilar =  ref<Movie[]>([])
    const moviesSimilarLoading =  ref<boolean>(true)
    const moviesSimilarPlayingPage = ref<number>(0)
    const moviesSimilarTotalPages = ref<number>(0)


    const fetchMoviesNowPlaying = (params?: MoviesFetchParams): Promise<AxiosResponse> => {
        return new Promise((resolve, reject)=>{
            moviesNowPlayingLoading.value = true
            const paramsToSend: MoviesQueryString = {
                api_key: getApiKey(),
                page: typeof params !== "undefined" && typeof params.page !== "undefined" ? params.page : 1
            }
            let appendItems = false
            if(typeof paramsToSend.page !== 'undefined' &&  paramsToSend.page > 1) {
                appendItems = true
            }
            if(typeof params !== 'undefined' && typeof params.language !== 'undefined') {
                paramsToSend.language = params.language
            }
            if(typeof params !== 'undefined' && typeof params.region !== 'undefined') {
                paramsToSend.region = params.region
            }
            getMoviesNowPlaying(paramsToSend).then((res: AxiosResponse) => {
                if(!appendItems) {
                    moviesNowPlaying.value = res.data.results
                } else {
                    moviesNowPlaying.value = [...moviesNowPlaying.value, ...res.data.results]
                }
                moviesNowPlayingPage.value = res.data.page
                moviesNowPlayingTotalPages.value = res.data.total_pages
                moviesNowPlayingLoading.value = false
                resolve(res.data)
            }).catch((err: AxiosError)=>{
                moviesNowPlayingLoading.value = false
                reject(err)
            })
        })
    }

    const fetchSimilarMovies = (movieId: number, params?: MoviesFetchParams): Promise<AxiosResponse> => {
        return new Promise((resolve, reject)=>{
            moviesSimilarLoading.value = true
            const paramsToSend: MoviesQueryString = {
                api_key: getApiKey(),
                page: typeof params !== "undefined" && typeof params.page !== "undefined" ? params.page : 1
            }
            let appendItems = false
            if(typeof paramsToSend.page !== 'undefined' &&  paramsToSend.page > 1) {
                appendItems = true
            }
            if(typeof params !== 'undefined' && typeof params.language !== 'undefined') {
                paramsToSend.language = params.language
            }
            if(typeof params !== 'undefined' && typeof params.region !== 'undefined') {
                paramsToSend.region = params.region
            }
            getSimilarMovies(movieId, paramsToSend).then((res: AxiosResponse) => {
                if(!appendItems) {
                    moviesSimilar.value = res.data.results
                } else {
                    moviesSimilar.value = [...moviesNowPlaying.value, ...res.data.results]
                }
                moviesSimilarPlayingPage.value = res.data.page
                moviesSimilarTotalPages.value = res.data.total_pages
                moviesSimilarLoading.value = false
                resolve(res.data)
            }).catch((err: AxiosError)=>{
                moviesSimilarLoading.value = false
                reject(err)
            })
        })
    }
    
    return {
        fetchMoviesNowPlaying,
        moviesNowPlaying,
        moviesNowPlayingLoading,
        moviesNowPlayingHasNextPage,
        moviesNowPlayingPage,
        fetchSimilarMovies,
        moviesSimilar,
        moviesSimilarLoading,
    };
  }