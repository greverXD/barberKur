<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  time: String,
  isSelected: Boolean,
});

const emit = defineEmits(['select-time']);

const handleClick = () => {
  emit('select-time', props.time);
};
</script>

<template>
  <button
    :class="[
      'px-4 py-2 rounded-md text-sm',
      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300',
    ]"
    @click="handleClick"
  >
    {{ time }}
  </button>
</template>

<style scoped>
</style>