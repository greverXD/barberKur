<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';
import MoreBlock from '@/components/moreBlock.vue';
import CompletedBlock from '@/components/completedBlock.vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const router = useRouter();
const store = useGlobalStore();
const searchQuery = ref('');

const services = computed(() => {
  if (store.selectedMaster) {
    return store.services.filter(service =>
      store.selectedMaster.availableServices.includes(service.moreLabel)
    );
  }
  return store.services;
});

const filteredServices = computed(() => {
  if (!searchQuery.value.trim()) {
    return services.value;
  }
  const query = searchQuery.value.trim().toLowerCase();
  return services.value.filter(service =>
    t(service.moreLabel).toLowerCase().startsWith(query)
  );
});

const noServicesMessage = computed(() => {
  if (!store.selectedMaster) {
    return t('noMasterSelected');
  }
  if (!store.selectedMaster.availableServices.length) {
    return t('noServicesAvailable');
  }
  if (searchQuery.value.trim()) {
    return t('noServicesMatchSearch');
  }
  return t('noServicesFound');
});

const goToNext = () => {
  if (store.selectedBlocks.length > 0 && store.selectedMaster && store.selectedTime && store.selectedDate) {
    router.push({ name: 'book' });
  } else if (store.selectedBlocks.length > 0 && !store.selectedMaster) {
    router.push({ name: 'master' });
  } else if (store.selectedBlocks.length > 0 && store.selectedMaster && (!store.selectedTime || !store.selectedDate)) {
    router.push({ name: 'time' });
  } else {
    console.log('Не выбраны все необходимые данные');
  }
  console.log('goToNext:', store.selectedMaster, store.selectedTime, store.selectedDate, store.selectedBlocks);
};

const goToManageServices = () => {
  router.push({ name: 'manageServices' });
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
      <p class="font-bold text-2xl">{{ t('services') }}</p>
    </div>

    <button @click="goToManageServices" class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 mb-4">
      {{ t('manageServices') }}
    </button>



    <input
      v-model="searchQuery"
      type="text"
      :placeholder="t('search')"
      class="w-[35vw] h-[6vh] rounded-xl p-4 mb-4"
      :aria-label="t('search')"
    />



    <div v-if="filteredServices.length === 0" class="text-gray-500 text-center">
      {{ noServicesMessage }}
    </div>
    <div class="flex flex-col gap-y-4">
      <MoreBlock
        v-for="service in filteredServices"
        :key="service.moreLabel"
        :more-label="t(service.moreLabel)"
        :text="t(service.text)"
        :time-work="service.timeWork"
        :money-one="service.moneyOne"
        :money-two="service.moneyTwo"
      />
    </div>

    <CompletedBlock @go-to-next="goToNext" />
  </div>
</template>

<style scoped>
</style>