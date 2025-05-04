<script setup>
import { defineProps, defineEmits } from 'vue';
import cross from '@/assets/cross.png'; // Иконка крестика

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['master', 'time', 'services'].includes(value),
  },
  data: {
    type: [Object, String, Array],
    required: true,
  },
});

const emit = defineEmits(['clear']);
</script>

<template>
  <div class="w-[40vw] h-[10vh] flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
    <!-- Для специалиста -->
    <template v-if="type === 'master'">
      <div class="flex items-center gap-x-4">
        <img :src="data.img" class="w-[4vw] h-auto rounded-full" />
        <div class="flex flex-col">
          <p class="font-bold">{{ data.name }}</p>
          <p class="text-gray-600">{{ data.role }}</p>
        </div>
      </div>
    </template>

    <!-- Для времени -->
    <template v-if="type === 'time'">
      <div class="flex items-center gap-x-4">
        <img src="@/assets/calendar.png" class="w-[1.5vw] h-[3vh]" />
        <p class="font-bold">{{ data }}</p>
      </div>
    </template>

    <!-- Для услуг -->
    <template v-if="type === 'services'">
      <div class="flex items-center gap-x-4">
        <img src="@/assets/list.png" class="w-[1.5vw] h-[3vh]" />
        <div class="flex flex-col">
          <p v-for="service in data" :key="service.moreLabel" class="font-bold">
            {{ service.moreLabel }}
          </p>
        </div>
      </div>
    </template>

    <!-- Крестик -->
    <button @click="$emit('clear')" class="ml-auto">
      <img :src="cross" class="w-[1.5vw] h-[3vh]" />
    </button>
  </div>
</template>

<style scoped>
</style>