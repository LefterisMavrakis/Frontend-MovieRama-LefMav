<template>
  <div class="movieItem">
    <div class="moviePoster">
      <div class="moviePosterBg" :style="`background-image:url(${getPostersBase()}${movie.poster_path})`">
        <!-- <img :src="`${getPostersBase()}${movie.poster_path}`" /> -->
      </div>
    </div>
    <div class="movieInfoWrapper">
      <div class="movieInfo movieTitle">
        {{ movie.title }} - {{ movie.vote_average }}
      </div>
      <div class="movieInfo releaseYear">
        <div class="label">
          Year of release:
        </div>
        <div class="value">
          {{ movieItemReleaseYear }}
        </div>
      </div>
      <div class="movieInfo genres">
        <div class="label">
          Genre(s):
        </div>
        <div class="value">
          {{ movieItemGenres }}
        </div>
      </div>
      <div class="movieInfo overview">
        <div class="label">
          Overview:
        </div>
        <div class="value">
          {{ movie.overview }}
        </div>
      </div>
      <div class="showMoreBtn genericTitle" @click="toggleMovieExpansion(true)">
        Show More
      </div>
    </div>
    <div class="movieItemDetailsWrapper" :class="{ visible: expansionVisible }">
      <div class="closeBtn" @click="toggleMovieExpansion(false)">
        <font-awesome-icon :icon="['fas', 'times']" size="lg" />
      </div>
      <MovieItemDetails v-if="expansionVisible" :movie="movie" />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { Movie } from '@/interfaces/movies-interfaces';
import useGenresStore from '@/stores/genres-store';
import useConfig from '@/composables/use-config';
import MovieItemDetails from './MovieItemDetails.vue';



export default defineComponent({
  name: 'MovieItem',
  components: {
    MovieItemDetails
  },
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true
    }
  },
  setup(props) {
    const { getPostersBase } = useConfig()
    const {
      movieGenres,
      movieGenresLoading
    } = useGenresStore()

    const expansionVisible = ref<boolean>(false)

    const movieItemGenres = computed(() => {
      return movieGenres.value.filter(genre => props.movie.genre_ids
        .includes(genre.id as number)).map(genre => {
          return genre.name
        }).join(', ')
    })

    const movieItemReleaseYear = computed(() => {
      const fullDate = new Date(props.movie.release_date)
      return fullDate.getFullYear()
    })

    const toggleMovieExpansion = (show: boolean) => {
      expansionVisible.value = show
    }


    return {
      movieGenres,
      movieGenresLoading,
      movieItemGenres,
      getPostersBase,
      movieItemReleaseYear,
      toggleMovieExpansion,
      expansionVisible
    }
  }
});
</script>
<style scoped lang="scss">
.movieItem {
  width: calc(33.33% - 20px);
  margin: 0 10px 20px;
  padding: 0 0 0;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow-y: hidden;

  .moviePoster {
    width: 100%;

    .moviePosterBg {
      width: 100%;
      position: relative;
      @include background-image(75% 0, contain);
      border-radius: 12px;
    }
  }

  .movieInfoWrapper {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    padding: 11px 0 0 0;

    .movieInfo {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      padding: 5px 20px;
      border-bottom: 1px solid #f4f4f4;
      box-sizing: border-box;

      &.movieTitle {
        font-size: 1.3rem;
        font-weight: bold;
      }

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-size: 1rem;
        font-weight: bold;
        color: $darkBlue;
        margin: 0 0 3px;
      }

      .value {
        width: 100%;
        color: $darkBlue;
        font-size: 1.05rem;
      }
    }

    .showMoreBtn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 20px 0 0;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.movieItemDetailsWrapper {
  position: absolute;
  height: 100%;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
  padding: 30px 10px 20px;
  box-sizing: border-box;


  &.visible {
    top: 0;
  }

  .closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>