import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { ref } from 'vue'
import { MoviesQueryString } from "@/interfaces/movies-interfaces";
import { MovieGenre, MovieGenreQueryString } from '@/interfaces/genres-interfaces';
import { getMovieGenres } from '@/services/genres-service';
import useConfig from '@/composables/use-config';

const movieGenres = ref<MovieGenre[]>([])
const movieGenresLoading = ref<boolean>(false)

export default function useGenresStore() {
    const {getApiKey} = useConfig()
    const fetchMovieGenres = (params?: MovieGenreQueryString): Promise<AxiosResponse> => {
        return new Promise((resolve, reject)=>{
            movieGenresLoading.value = true
            const paramsToSend: MoviesQueryString = {
                api_key: getApiKey(),
            }
            if(typeof params !== 'undefined' && typeof params.language !== 'undefined') {
                paramsToSend.language = params.language
            }
            getMovieGenres(paramsToSend).then((res: AxiosResponse) => {
                movieGenres.value = res.data.genres
                movieGenresLoading.value = false
                resolve(res.data)
            }).catch((err: AxiosError)=>{
                movieGenresLoading.value = false
                reject(err)
            })
        })
    }
    
    return {
        fetchMovieGenres,
        movieGenres,
        movieGenresLoading,
    };
  }