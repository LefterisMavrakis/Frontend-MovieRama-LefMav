<template>
  <div class="mainLayoutWrapper">
    <div class="mainLayoutInner">
      <header class="appHeader">
        <AppHeader/>
      </header>
      <main class="appMain">
        <router-view></router-view>
      </main>
      <footer class="appFooter">

      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader
  }
});
</script>