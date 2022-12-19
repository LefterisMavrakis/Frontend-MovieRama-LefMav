<template>
  <div class="welcomeBannerWrapper">
    <div class="constraintPage">
      <div class="welcomeBannerInner">
        <div class="welcomeMessage">
          <h2 class="genericTitle xl">
            Welcome.
          </h2>
          <div class="genericSubtitle xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
        </div>
        <SearchMovies />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import WelcomeBannerBg from "@/assets/WelcomeBannerBg.jpg";
import SearchMovies from './SearchMovies.vue';


export default defineComponent({
  name: 'WelcomeBanner',
  components: {
    SearchMovies
  },
  setup() {
    return {
      WelcomeBannerBg
    }
  }
});
</script>
<style scoped lang="scss">
.welcomeBannerWrapper {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: linear-gradient(to right, rgba($darkBlue, 0.8) 0%, rgba(darkBlue, 0) 100%), url('@/assets/WelcomeBannerBg.jpg');

  .welcomeBannerInner {
    width: 100%;
    position: relative;
    min-height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .welcomeMessage {
      color: #ffffff;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .genericTitle {
        margin: 0 0 0;
      }
    }
  }
}
</style>