<script setup>
import { computed, ref } from 'vue';
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
const localLang = useStorage('app-locale', 'ru');
const store = useGlobalStore();

const isLanguageMenuOpen = ref(false);

const languages = [
  { code: 'ru', label: t('language.ru') },
  { code: 'en', label: t('language.en') },
];

const currentLanguage = computed(() => {
  const lang = languages.find(l => l.code === locale.value) || languages[0];
  return lang.code.toUpperCase();
});

const changeLanguage = (lang) => {
  locale.value = lang;
  localLang.value = lang;
  isLanguageMenuOpen.value = false;
  console.log('Изменён язык на:', lang);
};

const clearMaster = () => {
  console.log('Очистка мастера, до:', store.selectedMaster, store.selectedTime);
  store.clearSelectedMaster();
  console.log('Очистка мастера, после:', store.selectedMaster, store.selectedTime);
};

const clearTime = () => {
  console.log('Очистка времени, до:', store.selectedTime, store.selectedDate);
  store.clearSelectedTime();
  store.clearSelectedDate();
  console.log('Очистка времени, после:', store.selectedTime, store.selectedDate);
};

const clearServices = () => {
  console.log('Очистка услуг, до:', store.selectedBlocks);
  store.clearSelectedBlocks();
  console.log('Очистка услуг, после:', store.selectedBlocks);
};

const items = computed(() => [
  {
    img: people,
    label: t('specialist'),
    icon: arrow,
    link: 'master',
    type: 'master',
    data: store.selectedMaster,
    clear: clearMaster,
  },
  {
    img: calendar,
    label: t('dateAndTime'),
    icon: arrow,
    link: 'time',
    type: 'time',
    data: store.selectedTime,
    clear: clearTime,
  },
  {
    img: list,
    label: t('services'),
    icon: arrow,
    link: 'hehe',
    type: 'services',
    data: store.selectedBlocks,
    clear: clearServices,
  },
]);

const isFullyBooked = computed(() => {
  return store.isFullyBooked();
});

const lastBooking = computed(() => {
  return store.bookings.length > 0 ? store.bookings[store.bookings.length - 1] : null;
});

const lastBookingDateDisplay = computed(() => {
  if (!lastBooking.value?.date) return t('notSelected');
  const date = new Date(lastBooking.value.date);
  return date.toLocaleDateString(localLang.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});
</script>

<template>
  <div class="w-[40vw] h-[50vh] mx-auto">
    <div class="flex w-[40vw] h-[10vh] justify-end items-center gap-x-4">
      <div class="relative">
        <button
          @click="isLanguageMenuOpen = !isLanguageMenuOpen"
          class="flex items-center gap-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors duration-200"
        >
          <span>{{ currentLanguage }}</span>
          <svg
            class="w-4 h-4 transform transition-transform duration-200"
            :class="{ 'rotate-180': isLanguageMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div
          v-if="isLanguageMenuOpen"
          class="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-10 overflow-hidden transition-all duration-200 transform origin-top"
          :class="{ 'scale-y-100 opacity-100': isLanguageMenuOpen, 'scale-y-0 opacity-0': !isLanguageMenuOpen }"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-150"
            :class="{ 'bg-gray-100': locale.value === lang.code }"
          >
            {{ lang.label }}
          </button>
        </div>
      </div>
      <router-link to="/login">
        <div class="flex items-center justify-center">
          <img :src="people" class="w-[1.5vw] h-[3vh]" />
        </div>
      </router-link>
    </div>

    <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src="people" class="w-[1.5vw] h-[3vh]" />
    </div>

    <div class="flex flex-col gap-y-2 mb-[2vh]">
      <div class="flex items-center gap-x-4">
        <p class="text-4xl">{{ t('city') }}</p>
        <img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px]" />
      </div>
      
    </div>

    <div class="flex gap-y-2 flex-col">
      <template v-for="(item, index) in items" :key="index">
        <SelectedBlock
          v-if="
            (item.type === 'master' && item.data) ||
            (item.type === 'time' && item.data) ||
            (item.type === 'services' && item.data.length > 0)"
          :type="item.type"
          :data="item.data"
          @clear="item.clear"
        />
        <InputBlock
          v-else
          :label="item.label"
          :img="item.img"
          :icon="item.icon"
          :link="item.link"
        />
      </template>
    </div>



    <div v-if="lastBooking" class="mt-4 p-4 bg-gray-100 rounded-xl">
      <p class="font-bold text-lg">{{ t('lastBooking') }}</p>
      <p class="mt-2"><span class="font-bold">{{ t('selectedServices') }}:</span></p>
      <ul class="list-disc pl-5">
        <li v-for="service in lastBooking.services" :key="service.moreLabel">
          {{ service.moreLabel }} ({{ service.timeWork }})
        </li>
      </ul>
      <p class="mt-2"><span class="font-bold">{{ t('specialistLabel') }}:</span> {{ lastBooking.master?.name || t('notSelected') }}</p>
      <p><span class="font-bold">{{ t('data') }}:</span> {{ lastBookingDateDisplay }}</p>
      <p><span class="font-bold">{{ t('timeLabel') }}:</span> {{ lastBooking.time || t('notSelected') }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
