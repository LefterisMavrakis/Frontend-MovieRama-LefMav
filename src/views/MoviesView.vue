<template>
  <div class="moviesViewWrapper" ref="scrollView">
    <WelcomeBanner />
    <div class="moviesContainerWrapper">
      <div class="moviesContainerInner">
        <div class="genericTitle lg">
          <div class="constraintPage">
            In Theater
          </div>
        </div>
        <div class="moviesContainer">
          <template v-if="moviesNowPlaying">
            <MovieItem v-for="movie in moviesNowPlaying" :movie="movie" :key="movie.id" />
          </template>
          <template v-if="moviesNowPlayingLoading">
            ...Loading
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import WelcomeBanner from '@/components/WelcomeBanner.vue';
import useMoviesStore from '@/stores/movies-store';
import useGenresStore from '@/stores/genres-store';
import MovieItem from '@/components/MovieItem.vue';

export default defineComponent({
  name: 'MoviesView',
  components: {
    WelcomeBanner,
    MovieItem
  },
  setup() {
    const {
      fetchMoviesNowPlaying,
      moviesNowPlaying,
      moviesNowPlayingLoading,
      moviesNowPlayingPage
    } = useMoviesStore()
    const {
      fetchMovieGenres
    } = useGenresStore()
    const scrollView = ref<HTMLElement>()


    fetchMovieGenres()
    fetchMoviesNowPlaying()


    const handleScroll = () => {
      let element = scrollView.value
      if (element && Math.round(element.getBoundingClientRect().bottom) <= window.innerHeight) {
        fetchMoviesNowPlaying({
          page: (moviesNowPlayingPage.value + 1)
        })
      }
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    return {
      moviesNowPlaying,
      moviesNowPlayingLoading,
      scrollView,
      moviesNowPlayingPage
    }


  }
});
</script>
<style scoped lang="scss">
.moviesViewWrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .moviesContainerWrapper {
    width: 100%;
    position: relative;
    margin: 30px 0 0;

    .generalTitle {
      .constraintPage {
        max-width: unset;
      }
    }


    .moviesContainerInner {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;

      .moviesContainer {
        width: calc(100% + 20px);
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 0 -10px;
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>