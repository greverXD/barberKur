<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import ButtonTime from '@/components/ui/buttonTime.vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const router = useRouter();
const store = useGlobalStore();

const toggleBlockOne = ref(true);
const toggleBlockTwo = ref(true);
const toggleBlockThree = ref(true);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const isAnimating = ref(false);

const defaultTimes = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

onMounted(() => {
  console.log('Selected master on mount:', store.selectedMaster);
  if (
    store.selectedMaster &&
    store.selectedDate &&
    store.selectedTime &&
    store.selectedBlocks.length > 0
  ) {
    router.push({ name: 'book' });
  } else if (store.selectedMaster && store.selectedDate && store.selectedTime) {
    router.push({ name: 'hehe' });
  }
});

const toggleOne = () => {
  toggleBlockOne.value = !toggleBlockOne.value;
};
const toggleTwo = () => {
  toggleBlockTwo.value = !toggleBlockTwo.value;
};
const toggleThree = () => {
  toggleBlockThree.value = !toggleBlockThree.value;
};

const months = [
  t('january'), t('february'), t('march'), t('april'), t('may'), t('june'),
  t('july'), t('august'), t('september'), t('october'), t('november'), t('december')
];

const daysOfWeek = computed(() => [
  t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')
]);

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay() || 7;
});

const calendarDays = computed(() => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = firstDayOfMonth.value;
  const totalDays = daysInMonth.value;

  console.log('Selected master in calendarDays:', store.selectedMaster);
  console.log('Schedule keys:', store.selectedMaster ? Object.keys(store.selectedMaster.schedule) : 'No master selected');

  for (let i = 1; i < firstDay; i++) {
    days.push({ empty: true });
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    console.log('Сгенерированный dateStr:', dateStr);
    const isPast = date < today;
    const isSelected = store.selectedDate === dateStr;
    let isAvailable = true;

    if (store.selectedMaster) {
      const scheduleForDate = store.getBarberSchedule(store.selectedMaster.id, dateStr);
      console.log(`Schedule for ${dateStr}:`, scheduleForDate);
      isAvailable = scheduleForDate.length > 0;
    } else if (store.selectedBlocks.length > 0) {
      const selectedServices = store.selectedBlocks.map(block => block.moreLabel);
      const availableBarbers = store.barbers.filter(master =>
        selectedServices.every(service => master.availableServices.includes(service))
      );
      isAvailable = availableBarbers.some(master =>
        store.getBarberSchedule(master.id, dateStr).length > 0
      );
    }
    days.push({ day: i, date: dateStr, isPast, isSelected, isAvailable });
    console.log(`Day ${dateStr}: isAvailable=${isAvailable}`);
  }

  return days;
});

const selectDay = (date) => {
  const day = calendarDays.value.find(d => d.date === date);
  if (day.isPast || !day.isAvailable) {
    console.log(`Cannot select date ${date}: isPast=${day.isPast}, isAvailable=${day.isAvailable}`);
    return;
  }
  store.setSelectedDate(date);
  console.log('Selected date:', date);

};

const availableTimes = computed(() => {
  if (!store.selectedDate) return [];
  console.log(`Available times for ${store.selectedDate}:`, defaultTimes);
  return defaultTimes; 
});

const selectTime = (time) => {
  store.setSelectedTime(time);
  console.log('Selected time:', time);

  if (store.selectedMaster && store.selectedDate && store.selectedTime) {
    if (store.selectedBlocks.length > 0) {
      router.push({ name: 'book' });
    } else {
      router.push({ name: 'hehe' });
    }
  }
};

const handleBooking = () => {
  if (store.selectedMaster && store.selectedDate && store.selectedTime && store.selectedBlocks.length > 0) {
    router.push({ name: 'book' });
  } else if (store.selectedDate && store.selectedTime) {
    router.push({ name: 'hehe' });
  } else {
    console.log('Не выбраны все необходимые данные');
  }
};

const prevMonth = () => {
  isAnimating.value = true;
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

const nextMonth = () => {
  isAnimating.value = true;
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

const selectMonth = (monthIndex) => {
  isAnimating.value = true;
  currentMonth.value = monthIndex;
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

const selectedDayDisplay = computed(() => {
  if (!store.selectedDate) return t('noDateSelected');
  const date = new Date(store.selectedDate);
  return date.toLocaleDateString(localLang.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});
</script>

<template>
  <div class="w-[50vw] mx-auto py-6">
    <div class="flex gap-x-2 mb-4">
      <router-link to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">{{ t('city') }}</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">{{ t('street') }}</p>
      </div>
    </div>

    <div class="mb-4 flex items-center justify-between">
      <button @click="prevMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300">
        {{ t('prev') }}
      </button>
      <select @change="selectMonth($event.target.value)" class="font-bold p-2 rounded">
        <option v-for="(month, index) in months" :key="index" :value="index" :selected="index === currentMonth">
          {{ month }} {{ currentYear }}
        </option>
      </select>
      <button @click="nextMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300">
        {{ t('next') }}
      </button>
    </div>

    <div class="mb-4">
      <p class="font-bold">{{ t('selectDate') }}</p>
      <div
        :key="`${currentYear}-${currentMonth}`"
        class="grid grid-cols-7 gap-1 mt-2 calendar"
        :class="{ 'calendar--animating': isAnimating }"
      >
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="text-center font-bold text-sm"
        >
          {{ day }}
        </div>
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
            'w-[6vw] h-[6vh] flex items-center justify-center border rounded-lg',
            day.isPast || !day.isAvailable ? 'bg-black text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100 cursor-pointer',
            day.isSelected ? 'bg-blue-400 text-white' : '',
            day.empty ? 'invisible' : '',
          ]"
          @click="!(day.isPast || !day.isAvailable) && selectDay(day.date)"
        >
          {{ day.day }}
        </div>
      </div>
    </div>

    <div v-if="store.selectedDate" class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">{{ t('morning') }}</div>
      <div class="flex items-center justify-center" @click="toggleOne">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockOne ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div v-show="toggleBlockOne" class="flex flex-row flex-wrap gap-4">
      <ButtonTime
        v-for="time in availableTimes.filter(t => parseInt(t.split(':')[0]) < 12)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <div v-if="store.selectedDate" class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">{{ t('afternoon') }}</div>
      <div class="flex items-center justify-center" @click="toggleTwo">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockTwo ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div v-show="toggleBlockTwo" class="flex flex-row flex-wrap gap-4">
      <ButtonTime
        v-for="time in availableTimes.filter(t => parseInt(t.split(':')[0]) >= 12 && parseInt(t.split(':')[0]) < 17)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <div v-if="store.selectedDate" class="flex flex-row w-[50vw] h-[10vh]">
      <div class="flex items-center w-[40vw]">{{ t('evening') }}</div>
      <div class="flex items-center justify-center" @click="toggleThree">
        <img
          :src="arrow"
          class="w-[1.5vw] h-[3vh]"
          :class="toggleBlockThree ? 'rotate-0' : 'rotate-180'"
        />
      </div>
    </div>
    <div v-show="toggleBlockThree" class="flex flex-row flex-wrap gap-4">
      <ButtonTime
        v-for="time in availableTimes.filter(t => parseInt(t.split(':')[0]) >= 17)"
        :key="time"
        :time="time"
        :is-selected="store.selectedTime === time"
        @select-time="selectTime"
      />
    </div>

    <div v-if="store.selectedDate && store.selectedTime" class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
      <button @click="handleBooking" class="w-[40vw] mx-auto h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 block">
        {{ t('book') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>