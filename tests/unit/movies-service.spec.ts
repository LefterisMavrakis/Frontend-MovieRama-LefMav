import { getMoviesNowPlaying } from '@/services/movies-service';
import { mainApi } from '@/plugins/axios';
import { mount, flushPromises } from '@vue/test-utils'
import useConfig from '@/composables/use-config';
const {getApiKey} = useConfig()

const mockMovieList = {
  data: [
  { 
    adult: false,
    backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    genre_ids: [28, 14, 878],
    id: 436270,
    original_language: "en",
    original_title: "Black Adam",
    overview: "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    popularity: 4728.432,
    poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    release_date: "2022-10-19",
    title: "Black Adam",
    video: false,
    vote_average: 7.3,
    vote_count: 2852,
   }
]
}
// jest.spyOn(mainApi, 'get').mockResolvedValue(mockMovieList)

test('loads movies', async () => {

  // Let's assert that we've called axios.get the right amount of times and
  // with the right parameters.

  expect(getMoviesNowPlaying({
    api_key: getApiKey(),
    page:1
  })).toHaveReturned();

  // // Finally, we make sure we've rendered the content from the API.
  // const movies = wrapper.findAll('movieItem')

  // expect(movies).toHaveLength(1)
  // expect(movies[0].text()).toContain('Black Adam')
})
