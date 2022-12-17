<template>
  <div class="movieItemDetails">
    <div class="sectionWrapper">
      <div class="genericTitle md">
        Trailer:
      </div>
      <div class="movieVideo">
        <template v-if="videoTrailerKey">
          <iframe width="100%" height="300" :src='`https://www.youtube.com/embed/${videoTrailerKey}`'>
          </iframe>
        </template>
        <template v-else>
          Video trailer is unavailable
        </template>
      </div>
    </div>

    <div class="sectionWrapper">
      <div class="genericTitle md">
        People say:
      </div>
      <div class="movieReviews">
        <template v-if="!movieReviewsLoading">
          <template v-if="filteredReviews.length > 0">
            <ReviewItem v-for="review in filteredReviews" :key="review.id" :review="review" />
          </template>
          <template v-else>
            No reviews yet
          </template>
        </template>
        <template v-else>
          <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
        </template>
      </div>
    </div>
    <div class="sectionWrapper">
      <div class="genericTitle md">
        Similar movies:
      </div>
      <div class="similarMovies">
        <template v-if="!moviesSimilarLoading">
          <template v-if="moviesSimilar.length > 0">
            <LmScrollCarousel :items="moviesSimilar" :pagination="false">
              <template #items="{ cssVars }">
                <div class="movieSlideItem" v-for="movieSimilar in moviesSimilar" :key="movieSimilar.id"
                  :style="cssVars">
                  <div class="movieImage">
                    <img :src="`${getPostersBase()}${movieSimilar.poster_path}`" />
                  </div>
                  <div class="movieTitle genericTitle sm">
                    {{ movieSimilar.title }}
                  </div>
                </div>
              </template>
            </LmScrollCarousel>
          </template>
          <template v-else>
            No similar movies
          </template>
        </template>
        <template v-else>
          <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Movie } from '@/interfaces/movies-interfaces';
import useReviewStore from '@/stores/reviews-store';
import useVideoStore from '@/stores/videos-store';
import useHelper from '@/composables/use-helper'
import { MovieReview } from '@/interfaces/reviews-interfaces';
import ReviewItem from './ReviewItem.vue';
import LmScrollCarousel from './common/LmScrollCarousel.vue';
import useMoviesStore from '@/stores/movies-store';
import useConfig from '@/composables/use-config';

export default defineComponent({
  name: 'MovieItem',
  components: {
    ReviewItem,
    LmScrollCarousel
  },
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true
    }
  },
  setup(props) {
    const { arrayTake } = useHelper()
    const { getPostersBase } = useConfig()

    const {
      fetchMovieReviews,
      movieReviews,
      movieReviewsLoading,
    } = useReviewStore()
    const filteredReviews = computed(() => {
      return arrayTake<MovieReview>(movieReviews.value, 2)
    })

    const {
      fetchMovieVideos,
      movieVideos,
      movieVideosLoading,
    } = useVideoStore()

    const {
      fetchSimilarMovies,
      moviesSimilar,
      moviesSimilarLoading,
    } = useMoviesStore()



    const videoTrailerKey = computed(() => {
      return movieVideos.value.find(video => video.type === 'Trailer')?.key
    })

    fetchMovieReviews(props.movie.id)
    fetchMovieVideos(props.movie.id)
    fetchSimilarMovies(props.movie.id)


    return {
      movieReviews,
      movieReviewsLoading,
      movieVideos,
      movieVideosLoading,
      videoTrailerKey,
      filteredReviews,
      moviesSimilar,
      moviesSimilarLoading,
      getPostersBase
    }
  }
});
</script>
<style scoped lang="scss">
.movieItemDetails {
  position: relative;
  height: 100%;
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
  padding: 0 10px 20px;
  box-sizing: border-box;
  overflow-y: auto;

  .sectionWrapper {
    width: 100%;
    position: relative;
    margin: 0 0 20px;
  }


}

.movieSlideItem {
  width: 120px;
  margin: 0 7px;
  display: flex;
  flex-direction: column;

  .movieImage {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .movieTitle {
    margin: 0;
  }

}
</style>