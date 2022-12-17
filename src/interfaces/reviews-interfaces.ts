import { PaginatedResponse } from "./common-interfaces";

interface MovieReviewsResponse extends PaginatedResponse {
    id: number;
    results: MovieReview[];
}
interface MovieReviewsQueryString {
    api_key: string;
    language?: string;
}
interface MovieReviewsFetchParams {
    language?: string;
}
interface MovieReview {
    author: string;
    author_details: ReviewAuthor;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

interface ReviewAuthor {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
}

export {
    MovieReview,
    MovieReviewsQueryString,
    MovieReviewsFetchParams,
    ReviewAuthor,
    MovieReviewsResponse
}