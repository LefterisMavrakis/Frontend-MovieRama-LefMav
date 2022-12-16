interface MovieGenreQueryString {
    api_key: string,
    language?: string
}

interface MovieGenre {
    id: number,
    name: string
}

export {
    MovieGenre,
    MovieGenreQueryString
}