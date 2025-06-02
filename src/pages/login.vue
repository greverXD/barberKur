<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import arrow from '@/assets/arrow.png';
import LoginByPhone from '@/components/loginByPhone.vue';
import LoginByPassword from '@/components/loginByPassword.vue';
import { useStorage } from '@vueuse/core';


const localLang = useStorage('app-locale', 'ru');
const { t } = useI18n();
const showPhoneLogin = ref(true);

const switchToPhone = () => {
  showPhoneLogin.value = true;
};

const switchToPassword = () => {
  showPhoneLogin.value = false;
};
</script>

<template>
  <div class="w-full max-w-md mx-auto py-6">
    <div class="flex gap-x-2">
      <RouterLink to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </RouterLink>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">{{ t('city') }}</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">{{ t('street') }}</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="font-bold text-2xl">{{ t('login') }}</p>
    </div>

    <div class="relative flex gap-x-2 mb-6">
      <button
        type="button"
        @click="switchToPhone"
        class="w-[50%] h-[5vh] text-black font-medium"
        :class="{ 'bg-gray-200': showPhoneLogin }"
      >
        {{ t('byPhone') }}
      </button>
      <button
        type="button"
        @click="switchToPassword"
        class="w-[50%] h-[5vh] text-black font-medium"
        :class="{ 'bg-gray-200': !showPhoneLogin }"
      >
        {{ t('byPassword') }}
      </button>
      <div class="absolute bottom-0 left-0 w-full h-[2px]">
        <div
          class="w-[50%] h-[2px] bg-black transition-transform duration-300 ease-in-out"
          :class="{ 'translate-x-0': showPhoneLogin, 'translate-x-full': !showPhoneLogin }"
        ></div>
      </div>
    </div>

    <div>
      <LoginByPhone v-show="showPhoneLogin" />
      <LoginByPassword v-show="!showPhoneLogin" />
    </div>

    <div class="mt-4 text-center">
      <RouterLink to="/register" class="text-blue-500 hover:underline">
        {{ t('noAccount') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>