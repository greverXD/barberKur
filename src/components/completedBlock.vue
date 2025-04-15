<script setup>
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/global';

const store = useGlobalStore();

// Вычисляем суммарное время в минутах
const totalTime = computed(() => {
  return store.selectedBlocks.reduce((sum, block) => {
    const minutes = parseInt(block.time) || 0;
    return sum + minutes;
  }, 0);
});

// Конвертируем общее время в часы и минуты
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

// Вычисляем сумму moneyOne и moneyTwo
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
    class="w-[40vw] mx-auto mt-6 p-6 bg-white rounded-2xl "
  >
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Выбранные услуги</h2>
    <div class="flex flex-col gap-y-4">
      <div>
        <p class="text-lg font-semibold text-gray-700">Услуги:</p>
        <ul class="pl-5 text-gray-600">
          <li v-for="(block, index) in store.selectedBlocks" :key="index">
            {{ block.moreLabel }}
          </li>
        </ul>
      </div>
      <div>
        <p class="text-lg font-semibold text-gray-700">Общее время:</p>
        <p class="text-gray-600">{{ formattedTime }}</p>
      </div>
      <div>
        <p class="text-lg font-semibold text-gray-700">Стоимость:</p>
        <p class="text-gray-600">
          {{ priceRange.min }}-{{ priceRange.max }} руб.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>