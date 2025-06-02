<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const router = useRouter();
const store = useGlobalStore();

const email = ref(store.bookingData.email);
const phone = ref(store.bookingData.phone);
const name = ref(store.bookingData.name);
const comment = ref(store.bookingData.comment);
const agreement1 = ref(store.bookingData.agreement1);
const agreement2 = ref(store.bookingData.agreement2);

const hasInteracted1 = ref(false);
const hasInteracted2 = ref(false);

const updateField = (field, value) => {
  store.updateBookingData(field, value);
};

const updateAgreement1 = (checked) => {
  hasInteracted1.value = true;
  updateField('agreement1', checked);
};

const updateAgreement2 = (checked) => {
  hasInteracted2.value = true;
  updateField('agreement2', checked);
};

const isFormValid = computed(() => {
  return (
    email.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    name.value.trim() !== '' &&
    agreement1.value &&
    agreement2.value
  );
});

const selectedDateDisplay = computed(() => {
  if (!store.selectedDate) return t('notSelected');
  const date = new Date(store.selectedDate);
  return date.toLocaleDateString(localLang.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const submitBooking = () => {
  if (isFormValid.value) {
    const booking = {
      services: [...store.selectedBlocks],
      master: store.selectedMaster ? { ...store.selectedMaster } : null,
      date: store.selectedDate,
      time: store.selectedTime,
      bookingData: { ...store.bookingData },
    };
    store.addBooking(booking);
    console.log('Booking:', booking);
    store.clearAll();
    router.push({ name: 'home' });
  }
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
      <p class="font-bold text-2xl">{{ t('confirmBooking') }}</p>
    </div>

    <div class="mb-6">
      <p class="font-bold">{{ t('selectedServices') }}</p>
      <ul class="list-disc pl-5">
        <li v-for="block in store.selectedBlocks" :key="block.moreLabel">
          {{ block.moreLabel }} ({{ block.timeWork }})
        </li>
      </ul>
      <p class="mt-2"><span class="font-bold">{{ t('specialistLabel') }}:</span> {{ store.selectedMaster?.name || t('notSelected') }}</p>
      <p><span class="font-bold">{{ t('data') }}:</span> {{ selectedDateDisplay }}</p>
      <p><span class="font-bold">{{ t('timeLabel') }}:</span> {{ store.selectedTime || t('notSelected') }}</p>
    </div>

    <div class="flex flex-col gap-y-4">
      <input
        v-model="email"
        @input="updateField('email', $event.target.value)"
        type="email"
        :placeholder="t('email')"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <input
        v-model="phone"
        @input="updateField('phone', $event.target.value)"
        type="tel"
        :placeholder="t('phoneNumber')"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <input
        v-model="name"
        @input="updateField('name', $event.target.value)"
        type="text"
        :placeholder="t('name')"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <textarea
        v-model="comment"
        @input="updateField('comment', $event.target.value)"
        :placeholder="t('comment')"
        class="w-full h-[12vh] rounded-xl p-4 border"
      ></textarea>
    </div>

    <div class="mt-4">
      <label class="flex items-center gap-x-2">
        <input
          v-model="agreement1"
          @change="updateAgreement1($event.target.checked)"
          type="checkbox"
          class="w-5 h-5"
        />
        <span>{{ t('serviceTerms') }}</span>
      </label>
      <p v-if="!agreement1 && hasInteracted1" class="text-red-500 text-sm mt-1">
        {{ t('mustAgreeTerms') }}
      </p>

      <label class="flex items-center gap-x-2 mt-4">
        <input
          v-model="agreement2"
          @change="updateAgreement2($event.target.checked)"
          type="checkbox"
          class="w-5 h-5"
        />
        <span>{{ t('dataProcessing') }}</span>
      </label>
      <p v-if="!agreement2 && hasInteracted2" class="text-red-500 text-sm mt-1">
        {{ t('mustAgreeData') }}
      </p>
    </div>

    <div class="mt-6">
      <button
        :disabled="!isFormValid"
        @click="submitBooking"
        class="w-full h-[6vh] rounded-xl"
        :class="isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
      >
        {{ t('book') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>