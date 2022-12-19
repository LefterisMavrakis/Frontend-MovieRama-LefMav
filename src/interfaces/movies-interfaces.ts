interface MoviesQueryString {
    api_key: string,
    language?: string,
    page?: number,
    region?: string,
}
interface MoviesFetchParams {
    language?: string;
    page?: number;
    region?: string;
}
interface MoviesSearchQueryString extends MoviesQueryString {
    query: string;
    include_adult?: boolean;
    year?: number;
    primary_release_year?: number;
}
interface MoviesSearchParams extends MoviesFetchParams {
    query: string;
    include_adult?: boolean;
    year?: number;
    primary_release_year?: number;
}

interface Movie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    number: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export {
    MoviesQueryString,
    Movie,
    MoviesFetchParams,
    MoviesSearchQueryString,
    MoviesSearchParams
}