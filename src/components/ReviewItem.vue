<template>
  <div class="reviewItem">
    <div class="reviewUserInfo">
      <div class="reviewAuthor">
        <font-awesome-icon icon="fa-solid fa-user" size="sm" color="gray" />
        <span>{{ review.author }}</span>
      </div>
      <div class="reviewRating">
        <font-awesome-icon icon="fa-solid fa-star" size="sm" color="gray" />
        <span>
          {{ review.author_details.rating ? review.author_details.rating : 'Not rated' }}
        </span>
      </div>
    </div>
    <div class="reviewText" v-html="review.content">
    </div>
  </div>
</template>


<script lang="ts">
import { MovieReview } from '@/interfaces/reviews-interfaces';
import { defineComponent, PropType } from 'vue';


export default defineComponent({
  name: 'ReviewItem',
  props: {
    review: {
      type: Object as PropType<MovieReview>,
      required: true
    }
  }
});
</script>
<style scoped lang="scss">
.reviewItem {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 10px;

  .reviewUserInfo {
    display: flex;
    align-items: center;
    margin: 0 0 3px;
    color: $darkBlue;
    font-size: 1.2rem;

    &>div {
      &:first-child {
        margin: 0 10px 0 0;
      }

      span {
        margin: 0 0 0 5px;
      }
    }

  }

  .reviewText {
    width: 100%;
    font-size: 1rem;
    color: grey;
    line-height: 1.3;
  }
}
</style>