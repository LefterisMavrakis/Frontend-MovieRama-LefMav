<template>
  <div class="baseInputWrapper">
    <input :type="inputType" :name="inputName" :value="modelValue" @input="handleUpdateInput($event.target?.value)"
      :placeholder="inputPlaceholder" @click="handleClick()" autocomplete="off" :class="{ withPrepend: prependIcon }" />

    <div class="appendSlot" v-if="clearable && modelValue">
      <slot name="append">
      </slot>
    </div>
    <div class="prependSlot" v-if="prependIcon">
      <slot name="prepend"></slot>
      <div class="defaultPrependIcon" v-if="!$slots.prepend">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import debounce from 'lodash.debounce'

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    },
    inputType: {
      type: String as PropType<string>,
      default: () => 'text'
    },
    inputName: {
      type: String as PropType<string>,
      default: () => 'baseInput'
    },
    inputPlaceholder: {
      type: String as PropType<string>,
      default: 'Search for movies'
    },
    debounceTime: {
      type: Number as PropType<number>,
      default: 500
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: () => true
    },
    prependIcon: {
      type: Boolean as PropType<boolean>,
      default: () => true
    }
  },
  emits: ['update:modelValue', 'input:click'],
  setup(props, ctx) {
    const handleUpdateInput = debounce((value: string | number) => {
      ctx.emit('update:modelValue', value)
    }, props.debounceTime)

    const handleClick = () => {
      ctx.emit('input:click')
    }

    return {
      handleUpdateInput,
      debounce,
      handleClick
    }
  }
});
</script>
<style scoped lang="scss">
.baseInputWrapper {
  width: 100%;

  input {
    width: 100%;
    padding: 15px 10px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    box-sizing: border-box;

    &.withPrepend {
      padding-left: 50px !important;
    }
  }

  .appendSlot {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }

  .prependSlot {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
  }
}
</style>