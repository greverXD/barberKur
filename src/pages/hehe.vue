<script setup>
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import MoreBlock from '@/components/moreBlock.vue';
import CompletedBlock from '@/components/completedBlock.vue';

const router = useRouter();
const store = useGlobalStore();

const blocks = [
  {
    moreLabel: 'Удлинённая стрижка 1',
    timeWork: '40 мин',
    text: 'Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки',
    moneyOne: '40',
    moneyTwo: '45',
  },
  {
    moreLabel: 'Удлинённая стрижка 2',
    timeWork: '60 мин',
    text: 'Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки',
    moneyOne: '50',
    moneyTwo: '55',
  },
  {
    moreLabel: 'Удлинённая стрижка 3',
    timeWork: '75 мин',
    text: 'Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки',
    moneyOne: '60',
    moneyTwo: '65',
  },
  {
    moreLabel: 'Удлинённая стрижка 4',
    timeWork: '75 мин',
    text: 'Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки',
    moneyOne: '60',
    moneyTwo: '65',
  },
  {
    moreLabel: 'Удлинённая стрижка 5',
    timeWork: '75 мин',
    text: 'Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки',
    moneyOne: '60',
    moneyTwo: '65',
  },
];

// Обработчик кнопки "Записаться" в CompletedBlock
const goToNext = () => {
  if (store.selectedBlocks.length > 0 && store.selectedMaster && store.selectedTime) {
    // Все данные выбраны, переходим на страницу бронирования
    router.push({ name: 'book' });
  } else if (store.selectedBlocks.length > 0 && !store.selectedMaster) {
    // Выбрана услуга, но не выбран специалист, переходим на выбор специалиста
    router.push({ name: 'master' });
  } else if (store.selectedBlocks.length > 0 && store.selectedMaster && !store.selectedTime) {
    // Выбраны услуга и специалист, но не выбрано время, переходим на выбор времени
    router.push({ name: 'time' });
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
      <p class="font-bold text-2xl">Выбрать услуги</p>
    </div>

    <!-- Фильтр мастеров -->
    <div class="flex gap-x-2 my-4">
      <button class="rounded-full w-[8vw] h-[5vh] bg-black text-white">
        ТОП-МАСТЕР
      </button>
      <button class="rounded-full w-[5vw] h-[5vh] hover:bg-gray-400">
        МАСТЕР
      </button>
    </div>

    <!-- Поиск -->
    <input
      type="text"
      placeholder="Найти"
      class="w-[35vw] h-[6vh] rounded-xl p-4 mb-4"
    />

    <p class="font-bold text-2xl">ТОП-МАСТЕР</p>

    <!-- Список услуг -->
    <div class="flex flex-col gap-y-4">
      <MoreBlock
        v-for="block in blocks"
        :key="block.moreLabel"
        :more-label="block.moreLabel"
        :text="block.text"
        :timeWork="block.timeWork"
        :money-one="block.moneyOne"
        :money-two="block.moneyTwo"
      />
    </div>

    <!-- Блок с выбранными услугами и кнопкой -->
    <CompletedBlock @go-to-next="goToNext" />
  </div>
</template>

<style scoped>
</style>