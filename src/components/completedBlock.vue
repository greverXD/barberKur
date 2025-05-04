<script setup>
import { computed, defineEmits } from 'vue';
import { useGlobalStore } from '@/stores/global';

const store = useGlobalStore();
const emit = defineEmits(['go-to-next']);

const totalTime = computed(() => {
  return store.selectedBlocks.reduce((sum, block) => {
    const minutes = parseInt(block.timeWork) || 0;
    return sum + minutes;
  }, 0);
});

const formattedTime = computed(() => {
  const hours = Math.floor(totalTime.value / 60);
  const minutes = totalTime.value % 60;
  if (hours === 0) {
    return `${minutes} мин`;
  }
  if (minutes === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${minutes} мин`;
});

const priceRange = computed(() => {
  if (store.selectedBlocks.length === 0) {
    return { min: 0, max: 0 };
  }
  const totalMin = store.selectedBlocks.reduce((sum, block) => {
    return sum + (parseInt(block.moneyOne) || 0);
  }, 0);
  const totalMax = store.selectedBlocks.reduce((sum, block) => {
    return sum + (parseInt(block.moneyTwo) || 0);
  }, 0);
  return { min: totalMin, max: totalMax };
});
</script>

<template>
  <div
    v-if="store.selectedBlocks.length > 0"
    class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50"
  >
    <div class="flex w-[40vw] mx-auto flex-row justify-between gap-y-4">
      <div>
        <ul>
          <li v-for="block in store.selectedBlocks" :key="block.moreLabel">
            {{ block.moreLabel }}
          </li>
        </ul>
      </div>
      <div>
        <p class="text-gray-600">{{ formattedTime }}</p>
        <p class="text-gray-600">{{ priceRange.min }}-{{ priceRange.max }} BYN</p>
      </div>
    </div>
    <button
      @click="$emit('go-to-next')"
      class="w-[40vw] mx-auto mt-4 h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 block"
    >
      Записаться
    </button>
  </div>
</template>

<style scoped>
</style>