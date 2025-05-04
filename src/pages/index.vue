<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import ButtonTime from '@/components/ui/buttonTime.vue';

const router = useRouter();
const store = useGlobalStore();

// Реактивные переменные для сворачивания/разворачи ==========вания блоков
const toggleBlockOne = ref(true);
const toggleBlockTwo = ref(true);
const toggleBlockThree = ref(true);

const toggleOne = () => {
  toggleBlockOne.value = !toggleBlockOne.value;
};
const toggleTwo = () => {
  toggleBlockTwo.value = !toggleBlockTwo.value;
};
const toggleThree = () => {
  toggleBlockThree.value = !toggleBlockThree.value;
};

// Список времени
const times = [
  '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
  '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
  '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
];

// Обработчик выбора времени
const selectTime = (time) => {
  store.setSelectedTime(time);
};

// Обработчик кнопки "Записаться"
const goToServices = () => {
  router.push({ name: 'hehe' });
};
</script>

<template>
  <div class="w-[50vw] mx-auto py-6">
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

    <!-- Утро -->
    <div class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">
        Утро
      </div>
      <div class="flex items-center justify-center" @click="toggleOne">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockOne ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div
      v-show="toggleBlockOne"
      class="flex flex-row flex-wrap gap-4"
    >
      <ButtonTime
        v-for="time in times.slice(0, 6)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <!-- День -->
    <div class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">
        День
      </div>
      <div class="flex items-center justify-center" @click="toggleTwo">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockTwo ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div
      v-show="toggleBlockTwo"
      class="flex flex-row flex-wrap gap-4"
    >
      <ButtonTime
        v-for="time in times.slice(6, 12)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <!-- Вечер -->
    <div class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">
        Вечер
      </div>
      <div class="flex items-center justify-center" @click="toggleThree">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockThree ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div
      v-show="toggleBlockThree"
      class="flex flex-row flex-wrap gap-4"
    >
      <ButtonTime
        v-for="time in times.slice(12)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <!-- Кнопка "Записаться" -->
    <div
      v-if="store.selectedTime"
      class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50"
    >
      <button
        @click="goToServices"
        class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800"
      >
        Записаться
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>