<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import five from '@/assets/four.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const store = useGlobalStore();
const selectedBarber = ref(null);
const isEditing = ref(false);
const errorMessage = ref('');
const newScheduleDate = ref(''); // Поле для ввода даты (например, 2025-06-03)
const newScheduleTimes = ref(''); // Поле для ввода времени (например, 12:00, 12:30)

const barbers = computed(() => store.barbers);

const addBarber = () => {
  try {
    const newBarber = {
      id: Date.now(),
      name: 'Новый мастер',
      role: 'Мастер',
      schedule: {},
      img: five,
      availableServices: [],
      bio: 'Новый мастер',
      reviews: [],
    };
    store.addBarber(newBarber);
    errorMessage.value = '';
    editBarber(newBarber); // Открываем форму редактирования сразу после добавления
  } catch (error) {
    errorMessage.value = t('errorCreatingBarber') + ': ' + error.message;
  }
};

const editBarber = (barber) => {
  selectedBarber.value = {
    ...barber,
    schedule: JSON.stringify(barber.schedule, null, 2),
    availableServices: barber.availableServices.join(', '),
  };
  isEditing.value = true;
  errorMessage.value = '';
  newScheduleDate.value = '';
  newScheduleTimes.value = '';
};

const validateBarber = () => {
  if (!selectedBarber.value.name.trim()) {
    errorMessage.value = t('emptyBarberName');
    return false;
  }
  if (!selectedBarber.value.role.trim()) {
    errorMessage.value = t('emptyRole');
    return false;
  }
  try {
    const schedule = JSON.parse(selectedBarber.value.schedule || '{}');
    if (typeof schedule !== 'object' || !schedule) {
      errorMessage.value = t('invalidScheduleFormat');
      return false;
    }
    for (const date in schedule) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        errorMessage.value = t('invalidDateFormat');
        return false;
      }
      if (!Array.isArray(schedule[date]) || schedule[date].length === 0) {
        errorMessage.value = t('invalidScheduleFormat');
        return false;
      }
      for (const time of schedule[date]) {
        if (!/^\d{2}:\d{2}$/.test(time)) {
          errorMessage.value = t('invalidTimeFormat');
          return false;
        }
      }
    }
  } catch {
    errorMessage.value = t('invalidScheduleFormat');
    return false;
  }
  return true;
};

const addSchedule = () => {
  if (!newScheduleDate.value || !newScheduleTimes.value) {
    errorMessage.value = t('emptyDateOrTime');
    return;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(newScheduleDate.value)) {
    errorMessage.value = t('invalidDateFormat');
    return;
  }
  const times = newScheduleTimes.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t && /^\d{2}:\d{2}$/.test(t));
  if (times.length === 0) {
    errorMessage.value = t('invalidTimeFormat');
    return;
  }
  try {
    const schedule = JSON.parse(selectedBarber.value.schedule || '{}');
    schedule[newScheduleDate.value] = [...new Set([...(schedule[newScheduleDate.value] || []), ...times])].sort();
    selectedBarber.value.schedule = JSON.stringify(schedule, null, 2);
    errorMessage.value = '';
    newScheduleDate.value = '';
    newScheduleTimes.value = '';
  } catch {
    errorMessage.value = t('invalidScheduleFormat');
  }
};

const saveBarber = () => {
  if (selectedBarber.value) {
    try {
      if (!validateBarber()) return;
      store.updateBarber({
        ...selectedBarber.value,
        schedule: JSON.parse(selectedBarber.value.schedule),
        availableServices: selectedBarber.value.availableServices
          .split(',')
          .map(s => s.trim())
          .filter(s => s),
      });
      isEditing.value = false;
      selectedBarber.value = null;
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = t('errorSavingBarber') + ': ' + error.message;
    }
  }
};

const deleteBarber = (id) => {
  try {
    store.deleteBarber(id);
    if (selectedBarber.value && selectedBarber.value.id === id) {
      isEditing.value = false;
      selectedBarber.value = null;
    }
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = t('errorDeletingBarber') + ': ' + error.message;
  }
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2">
      <router-link to="/master">
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
      <p class="font-bold text-2xl">{{ t('manageBarbers') }}</p>
    </div>

    <button @click="addBarber" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 mb-4">
      {{ t('addBarber') }}
    </button>

    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

    <div class="flex flex-col gap-y-4">
      <div v-for="barber in barbers" :key="barber.id" class="flex items-center justify-between p-4 border rounded-xl">
        <div class="flex items-center gap-x-4">
          <img :src="barber.img" class="w-[1.5vw] h-[3vh]" />
          <div>
            <p class="font-bold">{{ barber.name }}</p>
            <p class="text-sm">{{ barber.role }}</p>
          </div>
        </div>
        <button @click="editBarber(barber)" class="text-blue-500 hover:underline">{{ t('edit') }}</button>
      </div>
    </div>

    <div v-if="isEditing" class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">{{ t('barberName') }}</label>
        <input v-model="selectedBarber.name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="role" class="block text-sm font-medium text-gray-700">{{ t('role') }}</label>
        <input v-model="selectedBarber.role" type="text" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="scheduleDate" class="block text-sm font-medium text-gray-700">{{ t('scheduleDate') }}</label>
        <input
          v-model="newScheduleDate"
          type="text"
          id="scheduleDate"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="например: 2025-06-03"
        />
      </div>
      <div class="mb-4">
        <label for="scheduleTimes" class="block text-sm font-medium text-gray-700">{{ t('scheduleTimes') }}</label>
        <input
          v-model="newScheduleTimes"
          type="text"
          id="scheduleTimes"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="например: 12:00, 12:30"
        />
        <button @click="addSchedule" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {{ t('addSchedule') }}
        </button>
      </div>
      <div class="mb-4">
        <label for="schedule" class="block text-sm font-medium text-gray-700">{{ t('schedule') }}</label>
        <textarea
          v-model="selectedBarber.schedule"
          id="schedule"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder='например: {"2025-06-03": ["12:00", "12:30"]}'
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="services" class="block text-sm font-medium text-gray-700">{{ t('barberServices') }}</label>
        <input
          v-model="selectedBarber.availableServices"
          type="text"
          id="services"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="например: Удлинённая стрижка 1, Удлинённая стрижка 2"
        />
      </div>
      <div class="mb-4">
        <label for="bio" class="block text-sm font-medium text-gray-700">{{ t('bio') }}</label>
        <textarea v-model="selectedBarber.bio" id="bio" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
      </div>
      <div class="mb-4">
        <p class="font-bold">{{ t('reviews') }} ({{ selectedBarber.reviews.length }})</p>
        <p>{{ t('averageRating') }}: {{ store.getAverageRating(selectedBarber.id) }} ★</p>
        <div v-if="selectedBarber.reviews.length === 0" class="text-gray-500">
          {{ t('noReviews') }}
        </div>
        <div v-else class="flex flex-col gap-y-2">
          <div v-for="review in selectedBarber.reviews" :key="review.id" class="p-2 border rounded">
            <p>{{ review.stars }} ★</p>
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
      <div class="flex gap-x-2">
        <button @click="saveBarber" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800">{{ t('save') }}</button>
        <button @click="deleteBarber(selectedBarber.id)" class="w-full h-[6vh] bg-red-600 text-white rounded-xl hover:bg-red-700">{{ t('delete') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>