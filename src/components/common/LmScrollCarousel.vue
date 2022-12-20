<template>
  <div class="lmScrollCarouselWrapper" :class="[customClasses]">
    <div ref="carouselViewport" class="lmScrollCarouselViewport" :class="{ noScrollbar: !showScrollbar }">
      <div ref="carouselTrack" class="lmScrollCarouselTrack">
        <slot :cssVars="cssVars" name="items"></slot>
      </div>
    </div>
    <div class="lmScrollCarouselNavigation">
      <template v-if="!$slots.navigation">
        <div class="lm-nav lm-prev" @click="carouselPrev()">
          <!-- <div class="lm-nav-shadow"></div> -->
          <font-awesome-icon icon="fa-solid fa-chevron-left" size="xl" color="gray" />
        </div>
        <div class="lm-nav lm-next" @click="carouselNext()">
          <!-- <div class="lm-nav-shadow" @click="carouselNext()"></div> -->
          <font-awesome-icon icon="fa-solid fa-chevron-right" size="xl" color="gray" />
        </div>
      </template>
      <slot name="navigation" :carouselNext="carouselNext" :carouselPrev="carouselPrev"
        :carouselViewportScroll="carouselViewportScroll"></slot>
    </div>
    <div class="lmScrollCarouselPagination" v-if="pagination">
      <div class="lmScrollCarouselPaginationContainer">
        <div class="paginationItem" v-for="(page, index) in carouselPages" :key="index" @click="handlePageClick(page)"
          :class="{ active: page === carouselActivePage }">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export default defineComponent({
  name: 'LmScrollCarousel',
  props: {
    items: {
      type: Array,
      required: true
    },
    customClasses: {
      type: Array,
      default: () => []
    },
    showScrollbar: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    fixedWidthMode: {
      type: Boolean,
      default: true
    },
    itemsToShow: {
      type: Number,
      default: 9
    },
    itemsToScroll: {
      type: Number,
      default: 1
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const carouselViewport = ref<HTMLElement>()
    const carouselTrack = ref<HTMLElement>()
    const itemWidth = ref(120)
    const itemsInViewport = computed(() => {
      if (props.fixedWidthMode) {
        return carouselViewport.value ? parseFloat((carouselViewport.value.clientWidth / itemWidth.value).toFixed(2)) : 0
      } else {
        return props.itemsToShow
      }
    })
    const carouselPages = computed(() => {
      return Math.ceil(props.items.length / itemsInViewport.value)
    })
    const carouselActivePage = ref(1)
    const cssVars = computed(() => {
      if (props.fixedWidthMode) {
        return {
          'width': itemWidth.value + 'px'
        }
      }
      if (carouselViewport.value && !props.fixedWidthMode) {
        return {
          'width': (carouselViewport.value.clientWidth / props.itemsToShow) + 'px !important'
        }
      }
      return {
        'width': 'auto'
      }
    })
    const carouselViewportScroll = ref(0)

    const carouselNext = () => {
      if (carouselViewport.value) {
        carouselActivePage.value++
        if (carouselActivePage.value > carouselPages.value) {
          carouselActivePage.value = carouselPages.value
        }
        carouselViewport.value.scrollLeft += (itemWidth.value * itemsInViewport.value)
      }
    }

    const carouselPrev = () => {
      if (carouselViewport.value) {
        carouselActivePage.value--
        if (carouselActivePage.value < 1) {
          carouselActivePage.value = 1
        }
        carouselViewport.value.scrollLeft -= (itemWidth.value * itemsInViewport.value)
      }
    }
    const handlePageClick = (index: number) => {
      carouselActivePage.value = index
    }

    const resizeHandler = () => {
      if (carouselTrack.value) {
        carouselActivePage.value = 1
        itemWidth.value = carouselTrack.value.children[0].clientWidth
      }
    }
    const scrollHandler = (e: Event) => {
      if (e.target instanceof Element) {
        carouselViewportScroll.value = e.target?.scrollLeft
      }
    }
    watch(carouselActivePage, (newVal, oldVal) => {
      if (carouselViewport.value) {
        const difference = Math.abs(newVal - oldVal)
        if (newVal > oldVal) {
          carouselViewport.value.scrollLeft += Math.ceil(((itemWidth.value * itemsInViewport.value) * difference))
        }
        if (newVal < oldVal) {
          carouselViewport.value.scrollLeft -= Math.ceil(((itemWidth.value * itemsInViewport.value) * difference))
        }
      }
    })
    onMounted(() => {
      resizeHandler()
      window.addEventListener('resize', resizeHandler)
      if (carouselViewport.value) {
        carouselViewport.value.addEventListener('scroll', scrollHandler)
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
      if (carouselViewport.value) {
        carouselViewport.value.removeEventListener('scroll', scrollHandler)
      }
    })

    return {
      carouselViewport,
      carouselTrack,
      carouselNext,
      carouselPrev,
      carouselPages,
      carouselActivePage,
      handlePageClick,
      cssVars,
      carouselViewportScroll
    }
  }
})
</script>
<style lang="scss">
.lmScrollCarouselWrapper {
  width: 100%;
  position: relative;
  max-width: 1920px;
}

.lmScrollCarouselViewport {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  scroll-behavior: smooth;
  padding: 0 0 10px;
  transition: all 0.3s ease;
  overflow-x: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.noScrollbar::-webkit-scrollbar {
  display: none;
}

.featureButtonsWrapper .lmScrollCarouselViewport {
  padding: 40px;
}

.lmScrollCarouselTrack {
  width: auto;
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin: 0 0 0 -7px;
}

.scrollbarOverlay {
  position: absolute;
  height: 20px;
  width: 100%;
  background-color: #ffffff;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.lmScrollCarouselNavigation {
  width: 100%;
  /*position: absolute;*/
  top: 50%;
  height: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  z-index: 101;
}

.lmScrollCarouselNavigation .lm-nav {
  cursor: pointer;
  z-index: 2;
  background-color: transparent;
  width: 36px;
  height: 36px;
  opacity: 1;
  transition: all 0.3s ease;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  top: 50%;
  transform: translateY(-100%);
  justify-content: center;
  position: absolute;
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.lmScrollCarouselNavigation .lm-nav-shadow {
  position: absolute;
  height: 100%;
  width: 150px;
  background: rgb(247, 247, 247);
  background: linear-gradient(90deg, rgba(247, 247, 247, 0) 0%, rgba(247, 247, 247, 0) 11%, rgba(247, 247, 247, 0.4766281512605042) 45%, rgba(247, 247, 247, 1) 100%);
}

.lmScrollCarouselNavigation .lm-next .lm-nav-shadow {
  right: 0;
  background: rgb(247, 247, 247);
  background: linear-gradient(90deg, rgba(247, 247, 247, 0) 0%, rgba(247, 247, 247, 0) 11%, rgba(247, 247, 247, 0.4766281512605042) 45%, rgba(247, 247, 247, 1) 100%);
}

.lmScrollCarouselNavigation .lm-prev .lm-nav-shadow {
  left: 0;
  background: rgb(247, 247, 247);
  background: linear-gradient(90deg, rgba(247, 247, 247, 1) 0%, rgba(247, 247, 247, 0.4766281512605042) 45%, rgba(247, 247, 247, 0) 52%, rgba(247, 247, 247, 0) 100%);
}

.lmScrollCarouselNavigation .lm-nav i {
  font-size: 44px;
  margin: 0 0 20px;
}

.featureButtonsWrapper .lmScrollCarouselNavigation .lm-nav {
  width: 36px;
  height: 36px;
}

.featureButtonsWrapper .lmScrollCarouselNavigation {
  top: 60%;
}

.lmScrollCarouselNavigation .lm-nav:hover {
  opacity: 1;
}

.lmScrollCarouselNavigation .lm-prev {
  left: -1px;
  /*transform: translate(0, -100%);*/
}

.lmScrollCarouselNavigation .lm-next {
  right: -1px;
  /*transform: translate(0, -100%);*/
}

.lmScrollCarouselPagination {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.lmScrollCarouselPaginationContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  position: relative;
}

.lmScrollCarouselPaginationContainer .paginationItem {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #d0cece;
  margin: 0 5px;
  cursor: pointer;
}

.lmScrollCarouselPaginationContainer .paginationItem.active {
  background-color: #4d4d4d;
}



@media (max-width: 992px) {
  .lmScrollCarouselTrack .productItemWrapper {
    width: 200px !important;
  }

  .productsSliderWrapper .carouselLoader>div {
    margin: 0 10px 0 0;
  }
}
</style>
