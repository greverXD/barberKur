<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import Master from '@/components/master.vue';
import ButtonTime from '@/components/ui/buttonTime.vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const router = useRouter();
const route = useRoute();
const store = useGlobalStore();
const mode = computed(() => route.query.mode || 'barber');

const masters = computed(() => {
  let filtered = store.barbers;
  if (store.selectedBlocks.length > 0) {
    const selectedServices = store.selectedBlocks.map(block => block.moreLabel);
    filtered = filtered.filter(master =>
      selectedServices.every(service => master.availableServices.includes(service))
    );
  }
  if (store.selectedDate && store.selectedTime) {
    filtered = filtered.filter(master =>
      store.getBarberSchedule(master.id, store.selectedDate).includes(store.selectedTime)
    );
  }
  return filtered;
});

const availableTimes = computed(() => {
  if (mode.value !== 'time' || (store.selectedDate && store.selectedTime)) return [];
  let filteredBarbers = store.barbers;
  if (store.selectedBlocks.length > 0) {
    const selectedServices = store.selectedBlocks.map(block => block.moreLabel);
    filteredBarbers = filteredBarbers.filter(master =>
      selectedServices.every(service => master.availableServices.includes(service))
    );
  }
  const allTimes = filteredBarbers
    .flatMap(master =>
      Object.entries(master.schedule)
        .filter(([date]) => new Date(date) >= new Date())
        .flatMap(([_, times]) => times)
    );
  return [...new Set(allTimes)].sort();
});

const selectMaster = (master) => {
  store.setSelectedMaster(master);
  console.log('Выбран мастер:', master);
  console.log('Расписание мастера:', master.schedule);
};

const selectTime = (time) => {
  store.setSelectedTime(time);
  console.log('Выбрано время:', time);
};

const goToTimeSelection = () => {
  if (store.selectedMaster && store.selectedTime && store.selectedDate && store.selectedBlocks.length > 0) {
    router.push({ name: 'book' }); 
  } else if (store.selectedMaster && store.selectedTime) {
    router.push({ name: 'hehe' }); 
  } else {
    router.push({ name: 'time' }); 
  }
  console.log('goToTimeSelection:', store.selectedMaster, store.selectedTime, store.selectedDate, store.selectedBlocks);
};

const goToManageBarbers = () => {
  router.push({ name: 'manageBarbers' });
};


</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2">
      <router-link to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">{{ t('city') }}</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">{{ t('street') }}</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="font-bold text-2xl">{{ mode === 'barber' ? t('specialist') : t('selectTime') }}</p>
    </div>

    <button @click="goToManageBarbers" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 mb-4">
      {{ t('manageBarbers') }}
    </button>

    <div v-if="mode === 'barber'" class="flex flex-col gap-y-4">
      <Master
        v-for="master in masters"
        :key="master.id"
        :master="master"
        :selected-master-id="store.selectedMaster?.id"
        :selected-time="store.selectedTime"
        @select-master="selectMaster"
      />
    </div>

    <div v-else-if="mode === 'time'" class="flex flex-col gap-y-4">
      <div v-if="availableTimes.length === 0" class="text-gray-500 text-center">
        {{ t('noTimesAvailable') }}
      </div>
      <div class="flex flex-row flex-wrap gap-4">
        <ButtonTime
          v-for="time in availableTimes"
          :key="time"
          :time="time"
          :is-selected="store.selectedTime === time"
          @select-time="selectTime"
        />
      </div>
    </div>

    <div v-if="(mode === 'barber' && store.selectedMaster) || (mode === 'time' && store.selectedTime)" class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
      <button @click="goToTimeSelection" class="w-[40vw] mx-auto h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 block">
        {{ t('book') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>