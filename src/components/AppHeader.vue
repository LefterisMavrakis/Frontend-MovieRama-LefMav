<template>
  <div class="appHeaderWrapper">
    <div class="constraintPage">
      <div class="appHeaderInner">
        <div class="appLogo">
          <img :src="TmdbLogo" alt="Tmdb" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TmdbLogo from "@/assets/tmdbLogo.svg";

export default defineComponent({
  name: 'AppHeader',
  setup() {
    return {
      TmdbLogo
    }
  }
});
</script>
<style scoped lang="scss">
.appHeaderWrapper {
  width: 100%;
  position: relative;
  background-color: $darkBlue;
  padding: 22px 0;

  .appHeaderInner {
    width: 100%;
    position: relative;

    .appLogo {
      width: 130px;

      img {
        width: 100%;
      }
    }
  }
}
</style>