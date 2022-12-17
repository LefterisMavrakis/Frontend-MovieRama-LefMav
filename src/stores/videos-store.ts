import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { ref } from 'vue'
import { getMovieVideos } from '@/services/videos-service';
import { MovieVideo, MovieVideoQueryString, MovieVideosFetchParams } from '@/interfaces/videos-interfaces';
import useConfig from '@/composables/use-config';

export default function useVideoStore() {
    const {getApiKey} = useConfig()
    const movieVideos = ref<MovieVideo[]>([])
    const movieVideosLoading = ref<boolean>(false)

    const fetchMovieVideos = (movieId: number, params?: MovieVideosFetchParams): Promise<AxiosResponse> => {
        return new Promise((resolve, reject)=>{
            movieVideosLoading.value = true
            const paramsToSend: MovieVideoQueryString = {
                api_key: getApiKey(),
            }
            if(typeof params !== 'undefined' && typeof params.language !== 'undefined') {
                paramsToSend.language = params.language
            }
            getMovieVideos(movieId, paramsToSend).then((res: AxiosResponse) => {
                movieVideos.value = res.data.results
                movieVideosLoading.value = false
                resolve(res.data)
            }).catch((err: AxiosError)=>{
                movieVideosLoading.value = false
                reject(err)
            })
        })
    }
    
    return {
        fetchMovieVideos,
        movieVideos,
        movieVideosLoading,
    };
  }