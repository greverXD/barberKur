<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const router = useRouter();
const store = useGlobalStore();
const selectedService = ref(null);
const isEditing = ref(false);
const errorMessage = ref('');
const oldMoreLabel = ref('');

const services = computed(() => store.services);

const addService = () => {
  try {
    isEditing.value = true;
    selectedService.value = {
      moreLabel: '',
      timeWork: '0 мин',
      text: '',
      moneyOne: '0',
      moneyTwo: '0',
    };
    oldMoreLabel.value = '';
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = t('errorCreatingService') + ': ' + error.message;
  }
};

const editService = (service) => {
  selectedService.value = { ...service };
  oldMoreLabel.value = service.moreLabel;
  isEditing.value = true;
  errorMessage.value = '';
};

const validateService = () => {
  if (!selectedService.value.moreLabel.trim()) {
    errorMessage.value = t('emptyServiceName');
    return false;
  }
  if (
    services.value.some(
      s =>
        s.moreLabel === selectedService.value.moreLabel &&
        s.moreLabel !== oldMoreLabel.value
    )
  ) {
    errorMessage.value = t('duplicateServiceName');
    return false;
  }
  if (!/^\d+\s*мин$/.test(selectedService.value.timeWork.trim())) {
    errorMessage.value = t('invalidTimeFormat');
    return false;
  }
  if (!/^\d+$/.test(selectedService.value.moneyOne.trim())) {
    errorMessage.value = t('invalidPriceOne');
    return false;
  }
  if (!/^\d+$/.test(selectedService.value.moneyTwo.trim())) {
    errorMessage.value = t('invalidPriceTwo');
    return false;
  }
  return true;
};

const saveService = () => {
  if (selectedService.value) {
    try {
      if (!validateService()) return;
      if (oldMoreLabel.value) {
        store.updateService({ ...selectedService.value }, oldMoreLabel.value);
      } else {
        store.addService({ ...selectedService.value });
      }
      isEditing.value = false;
      selectedService.value = null;
      oldMoreLabel.value = '';
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = t('errorSavingService') + ': ' + error.message;
    }
  }
};

const deleteService = (moreLabel) => {
  try {
    store.deleteService(moreLabel);
    if (selectedService.value && selectedService.value.moreLabel === moreLabel) {
      isEditing.value = false;
      selectedService.value = null;
      oldMoreLabel.value = '';
    }
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = t('errorDeletingService') + ': ' + error.message;
  }
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2">
      <router-link to="/hehe">
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
      <p class="font-bold text-2xl">{{ t('manageServices') }}</p>
    </div>

    <button @click="addService" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 mb-4">
      {{ t('addService') }}
    </button>

    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

    <div class="flex flex-col gap-y-4">
      <div v-for="service in services" :key="service.moreLabel" class="flex items-center justify-between p-4 border rounded-xl">
        <div>
          <p class="font-bold">{{ service.moreLabel }}</p>
          <p class="text-sm">{{ service.timeWork }} - {{ service.moneyOne }} / {{ service.moneyTwo }}</p>
        </div>
        <button @click="editService(service)" class="text-blue-500 hover:underline">{{ t('edit') }}</button>
      </div>
    </div>

    <div v-if="isEditing" class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md z-50">
      <div class="mb-4">
        <label for="moreLabel" class="block text-sm font-medium text-gray-700">{{ t('serviceName') }}</label>
        <input v-model="selectedService.moreLabel" type="text" id="moreLabel" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="timeWork" class="block text-sm font-medium text-gray-700">{{ t('workTime') }}</label>
        <input v-model="selectedService.timeWork" type="text" id="timeWork" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="например, 40 мин" required />
      </div>
      <div class="mb-4">
        <label for="text" class="block text-sm font-medium text-gray-700">{{ t('description') }}</label>
        <textarea v-model="selectedService.text" id="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
      </div>
      <div class="mb-4">
        <label for="moneyOne" class="block text-sm font-medium text-gray-700">{{ t('priceOne') }}</label>
        <input v-model="selectedService.moneyOne" type="text" id="moneyOne" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="например, 40" required />
      </div>
      <div class="mb-4">
        <label for="moneyTwo" class="block text-sm font-medium text-gray-700">{{ t('priceTwo') }}</label>
        <input v-model="selectedService.moneyTwo" type="text" id="moneyTwo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="например, 45" required />
      </div>
      <div class="flex gap-x-2">
        <button @click="saveService" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800">{{ t('save') }}</button>
        <button @click="deleteService(selectedService.moreLabel)" class="w-full h-[6vh] bg-red-600 text-white rounded-xl hover:bg-red-700">{{ t('delete') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>