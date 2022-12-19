<template>
  <div class="searchMoviesWrapper" :class="{ searchMode: searchResultsShow }">
    <div class="searchInput">
      <BaseInput v-model="searchTerm" @update:modelValue="handleSearch()" @input:click="setResultsShow(true)">
        <template v-slot:append>
          <div class="genericBtn" @click="handleSearchClear()">
            <font-awesome-icon :icon="['fas', 'times']" size="lg" />
          </div>
        </template>
      </BaseInput>
    </div>
    <div ref="searchResultsEl" class="searchResults" v-if="moviesSearched && searchResultsShow">
      <template v-if="moviesSearched.length > 0">
        <MovieItem v-for="movie in moviesSearched" :key="movie.id" :movie="movie" />
        <div ref="loadMoreEl" class="loadMoreBtn" v-if="moviesSearchedHasNextPage">
        </div>
      </template>
      <template v-else>
        Movie results are empty
      </template>
      <template v-if="moviesSearchedLoading">
        <div class="genericLoader" v-if="moviesSearchedLoading">
          <font-awesome-icon icon='fas fa-spinner' size="lg" class="faa-spin animated" />
        </div>
      </template>
    </div>
    <div class="focusSearchOverlay" :class="{ visible: searchResultsShow }" @click="setResultsShow(false)">
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import BaseInput from './Inputs/BaseInput.vue';
import useMoviesStore from '@/stores/movies-store';
import MovieItem from './MovieItem.vue';


export default defineComponent({
  name: 'SearchMovies',
  components: {
    BaseInput,
    MovieItem
  },
  setup(props, ctx) {
    const searchResultsEl = ref<HTMLElement>()
    const loadMoreEl = ref<Element>()
    const searchTerm = ref<string>('')
    const searchResultsShow = ref<boolean>(false)
    const { searchMoviesAction, moviesSearched, moviesSearchedLoading, moviesSearchedHasNextPage, moviesSearchedPage, resetSearchedMovies } = useMoviesStore()
    const handleSearch = () => {
      searchResultsShow.value = true
      if (searchTerm.value) {
        searchMoviesAction({
          query: searchTerm.value
        })
      }
    }
    const setResultsShow = (show: boolean) => {
      searchResultsShow.value = show
    }
    const loadMoreMovies = () => {
      searchMoviesAction({
        query: searchTerm.value,
        page: moviesSearchedPage.value + 1
      })
    }
    const observerOptions = {
      root: searchResultsEl.value,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          console.log('im intersevting');
          loadMoreMovies()
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions)

    const handleSearchClear = () => {
      searchTerm.value = ''
      resetSearchedMovies()
    }

    watch(loadMoreEl, (value) => {
      if (value) {
        intersectionObserver.observe(loadMoreEl.value as Element)
      }
    })
    watch(searchTerm, (value) => {
      if (!value) {
        resetSearchedMovies()
      }
    })

    return {
      searchTerm,
      handleSearch,
      moviesSearched,
      moviesSearchedLoading,
      searchResultsShow,
      setResultsShow,
      searchResultsEl,
      loadMoreEl,
      moviesSearchedHasNextPage,
      handleSearchClear
    }
  }
});
</script>
<style scoped lang="scss">
.searchMoviesWrapper {
  width: 100%;
  margin: 30px 0 0;
  position: relative;
  transition: all 0.3s ease;
  max-width: 1200px;

  &.searchMode {
    margin: 20px 0 0;
    position: fixed;
    z-index: 100;
    top: 0;
    height: 90vh;
    box-sizing: border-box;

    .searchResults {
      top: 42px;
      max-height: 90vh;
    }
  }

  .searchInput {
    position: relative;
    z-index: 1002;

    input:focus {
      border: none;
    }
  }

  .searchResults {
    width: 100%;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 30px 20px 20px;
    box-sizing: border-box;
    z-index: 1001;
    top: calc(100% - 15px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    max-height: 600px;
    overflow-y: auto;
    background-color: #f4f4f4;

    .movieItem {
      width: calc(33.33% - 20px);
    }
  }

  .focusSearchOverlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s ease;

    &.visible {
      visibility: visible;
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>