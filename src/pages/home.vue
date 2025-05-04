<script setup>
import { computed } from 'vue';
import people from '@/assets/people.png';
import calendar from '@/assets/calendar.png';
import list from '@/assets/list.png';
import arrow from '@/assets/arrow.png';
import InputBlock from '@/components/inputBlock.vue';
import SelectedBlock from '@/components/selected.vue';
import { useGlobalStore } from '@/stores/global';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale');
const store = useGlobalStore();

const changeLanguage = (lang) => {
  locale.value = lang;
  localLang.value = lang;
};

// Обработчики сброса данных
const clearMaster = () => {
  console.log('Clearing master, before:', store.selectedMaster, store.selectedTime);
  store.clearSelectedMaster();
  console.log('Clearing master, after:', store.selectedMaster, store.selectedTime);
};

const clearTime = () => {
  console.log('Clearing time, before:', store.selectedTime);
  store.clearSelectedTime();
  console.log('Clearing time, after:', store.selectedTime);
};

const clearServices = () => {
  console.log('Clearing services, before:', store.selectedBlocks);
  store.clearSelectedBlocks();
  console.log('Clearing services, after:', store.selectedBlocks);
};

// Реактивный массив items
const items = computed(() => [
  {
    img: people,
    label: 'Выбрать специалиста',
    icon: arrow,
    link: 'master',
    type: 'master',
    data: store.selectedMaster,
    clear: clearMaster,
  },
  {
    img: calendar,
    label: 'Выбрать дату и время',
    icon: arrow,
    link: 'time',
    type: 'time',
    data: store.selectedTime,
    clear: clearTime,
  },
  {
    img: list,
    label: 'Выбрать услуги',
    icon: arrow,
    link: 'hehe',
    type: 'services',
    data: store.selectedBlocks,
    clear: clearServices,
  },
]);
</script>

<template>
  <div class="w-[40vw] h-[50vh] mx-auto">
    <!-- Кнопка логина -->
    <div class="flex w-[40vw] h-[10vh] justify-end">
      <router-link to="/login">
        <div class="flex items-center justify-center">
          <img :src="people" class="w-[1.5vw] h-[3vh]" />
        </div>
      </router-link>
    </div>

    <!-- Аватар -->
    <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src="people" class="w-[1.5vw] h-[3vh]" />
    </div>

    <!-- Город и улица -->
    <div class="flex flex-col gap-y-2 mb-[2vh]">
      <div class="flex items-center gap-x-4">
        <p class="text-4xl">Город</p>
        <img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px]" />
      </div>
      <p class="text-1xl font-bold">Улица</p>
    </div>

    <!-- Список полей -->
    <div class="flex gap-y-2 flex-col">
      <template v-for="(item, index) in items" :key="index">
        <!-- Если данные выбраны, показываем SelectedBlock -->
        <SelectedBlock
          v-if="
            (item.type === 'master' && item.data) ||
            (item.type === 'time' && item.data) ||
            (item.type === 'services' && item.data.length > 0)
          "
          :type="item.type"
          :data="item.data"
          @clear="item.clear"
        />
        <!-- Иначе показываем InputBlock -->
        <InputBlock
          v-else
          :label="item.label"
          :img="item.img"
          :icon="item.icon"
          :link="item.link"
        />
      </template>
    </div>

    <!-- Локализация -->
    <h1>{{ t('hello') }}</h1>
    <button @click="changeLanguage('ru')">Русский</button>
    <button @click="changeLanguage('en')">English</button>
  </div>
</template>

<style scoped>
</style>