<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import five from '@/assets/five.png';
import Master from '@/components/master.vue';

const router = useRouter();
const store = useGlobalStore();

// Список специалистов
const masters = [
  {
    id: 1,
    name: 'Анна Иванова',
    role: 'Топ-мастер',
    day: 'вт',
    time: ['12:00', '13:00', '14:00'],
    img: five,
    availableServices: ['Удлинённая стрижка 1', 'Удлинённая стрижка 2'],
  },
  {
    id: 2,
    name: 'Михаил Петров',
    role: 'Мастер',
    day: 'вт',
    time: ['12:00', '13:00', '14:00'],
    img: five,
    availableServices: ['Удлинённая стрижка 3', 'Удлинённая стрижка 4'],
  },
  {
    id: 3,
    name: 'Елена Смирнова',
    role: 'Топ-мастер',
    day: 'вт',
    time: ['12:00', '13:00', '14:00'],
    img: five,
    availableServices: ['Удлинённая стрижка 1', 'Удлинённая стрижка 5'],
  },
];

// Обработчик выбора специалиста
const selectMaster = (master, isChecked) => {
  if (isChecked) {
    store.setSelectedMaster(master);
  } else {
    store.clearSelectedMaster();
  }
};

// Обработчик выбора времени специалиста
const selectMasterTime = (master, time) => {
  store.setSelectedMaster(master);
  store.setSelectedTime(time);
};

// Обработчик кнопки "Записаться"
const goToNextPage = () => {
  if (store.selectedMaster) {
    if (store.selectedTime) {
      // Если выбрано время, переходим к выбору услуги
      router.push({ name: 'hehe' });
    } else {
      // Если выбран только специалист, переходим к выбору времени
      router.push({ name: 'time' }); // Исправлено с 'index' на 'time'
    }
  }
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <!-- Заголовок и навигация -->
    <div class="flex gap-x-2">
      <router-link to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">Город</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">Улица</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="font-bold text-2xl">Выбрать специалиста</p>
    </div>

    <!-- Список специалистов -->
    <div class="flex flex-col gap-y-4">
      <Master
        v-for="master in masters"
        :key="master.id"
        :master="master"
        :selected-time="store.selectedTime"
        :selected-master-id="store.selectedMaster?.id"
        @select-master="selectMaster"
        @select-time="selectMasterTime"
      />
    </div>

    <!-- Кнопка "Записаться" -->
    <div
      v-if="store.selectedMaster"
      class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50"
    >
      <button
        @click="goToNextPage"
        class="w-[40vw] mx-auto h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 block"
      >
        Записаться
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>