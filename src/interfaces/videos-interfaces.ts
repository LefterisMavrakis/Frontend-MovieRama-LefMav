interface MovieVideoQueryString {
    api_key: string;
    language?: string;
}
interface MovieVideosFetchParams {
    language?: string;
}
interface MovieVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export {
    MovieVideo,
    MovieVideoQueryString,
    MovieVideosFetchParams
}