<script setup>
import { defineProps, defineEmits,computed } from 'vue';
import { useGlobalStore } from '@/stores/global';

const store = useGlobalStore();
const props = defineProps({
  master: Object,
  selectedTime: String,
  selectedMasterId: [Number, String],
});

const emit = defineEmits(['select-master', 'select-time']);

// Проверяем, выбран ли текущий специалист
const isMasterSelected = computed(() => {
  return props.selectedMasterId === props.master.id;
});
</script>

<template>
  <div class="w-[40vw] mx-auto p-4 bg-white rounded-xl shadow-md">
    <div class="flex flex-row gap-x-4">
      <!-- Изображение специалиста -->
      <div class="w-[4vw] h-auto">
        <img :src="master.img" class="rounded-full" />
      </div>
      <!-- Информация о специалисте -->
      <div class="flex flex-col">
        <p class="font-bold">{{ master.name }}</p>
        <p class="text-gray-600">{{ master.role }}</p>
      </div>
      <!-- Чекбокс для выбора специалиста -->
      <div class="ml-auto">
        <input
          type="checkbox"
          :checked="isMasterSelected && !selectedTime"
          @change="$emit('select-master', master, $event.target.checked)"
          class="w-5 h-5"
        />
      </div>
    </div>

    <!-- Доступное время -->
    <div class="mt-4">
      <p class="text-sm">Ближайшее время для записи ({{ master.day }})</p>
      <div class="flex flex-row gap-x-2 mt-2">
        <button
          v-for="time in master.time"
          :key="time"
          :class="[
            'flex items-center justify-center w-[5vw] h-[5vh] rounded-2xl',
            isMasterSelected && selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300',
          ]"
          @click="$emit('select-time', master, time)"
        >
          {{ time }}
        </button>
      </div>
    </div>

    <!-- Доступные услуги -->
    <div class="mt-4">
      <p class="text-sm">Доступные услуги:</p>
      <ul class="list-disc pl-5">
        <li v-for="service in master.availableServices" :key="service">{{ service }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>