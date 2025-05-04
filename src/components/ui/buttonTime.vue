<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  time: {
    type: String,
    required: true,
  },
  isSelected: Boolean,
});

const emit = defineEmits(['select-time']);
</script>

<template>
  <button
    :class="[
      'flex items-center justify-center w-[10vw] h-[5vh] rounded-2xl',
      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300',
    ]"
    @click="$emit('select-time', time)"
  >
    {{ time }}
  </button>
</template>

<style scoped>
</style>