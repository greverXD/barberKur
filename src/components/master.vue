<script setup>
import { defineProps, computed } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import ButtonTime from './ui/buttonTime.vue';

const { t } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const store = useGlobalStore();
const props = defineProps({
  master: Object,
  selectedMasterId: [Number, String],
  selectedTime: String,
});

const selectMasterAndTime = (time) => {
  store.setSelectedMaster(props.master);
  if (time) {
    store.setSelectedTime(time);
  }
  console.log('Selected master and time:', store.selectedMaster, store.selectedTime);
};

const isMasterSelected = computed(() => {
  return props.selectedMasterId === props.master.id;
});

const availableDates = computed(() => {
  if (!props.master || !props.master.schedule || typeof props.master.schedule !== 'object') {
    return [];
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Object.keys(props.master.schedule)
    .filter(date => new Date(date) >= today)
    .sort();
});

const nearestDate = computed(() => {
  return availableDates.value[0] || null;
});

const availableTimes = computed(() => {
  if (!nearestDate.value || (store.selectedDate && store.selectedTime)) {
    return [];
  }
  const times = store.getBarberSchedule(props.master.id, nearestDate.value).slice(0, 5);
  console.log(`Available times for master ${props.master.id} on ${nearestDate.value}:`, times);
  return times;
});
</script>

<template>
  <div class="w-[40vw] mx-auto p-4 bg-white rounded-xl shadow-md relative">
    <div class="flex w-[1vw] h-[1vh] mr-8">
      <router-link :to="`/master/${master.id}`" class="absolute top-4 right-14">
        <span class="text-blue-500 font-bold">i</span>
      </router-link>
    </div>
    <div class="flex flex-row gap-x-4">
      <div class="w-[4vw] h-auto">
        <img :src="master.img" class="rounded-full w-[4vw] h-[8vh]" />
      </div>
      <div class="flex flex-col">
        <p class="font-bold">{{ t(master.name) }}</p>
        <p class="text-gray-600">{{ t(master.role) }}</p>
      </div>
      <div class="ml-auto">
        <input
          type="checkbox"
          :checked="isMasterSelected"
          @change="selectMasterAndTime(null)"
          class="w-5 h-5"
        />
      </div>
    </div>

    <div v-if="availableTimes.length > 0" class="mt-4">
      <p class="text-sm">{{ t('nearestTime') }} ({{ nearestDate }})</p>
      <div class="flex flex-row gap-x-2 mt-2">
        <ButtonTime
          v-for="time in availableTimes"
          :key="time"
          :time="time"
          :is-selected="isMasterSelected && selectedTime === time"
          @select-time="selectMasterAndTime"
        />
      </div>
    </div>

    <div class="mt-4">
      <p class="text-sm">{{ t('availableServices') }}</p>
      <ul class="list-disc pl-5">
        <li v-for="service in master.availableServices" :key="service">{{ t(service) }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>