<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import arrow from '@/assets/arrow.png';
import LoginByPhone from '@/components/loginByPhone.vue';
import LoginByPassword from '@/components/loginByPassword.vue';

// Реактивная переменная для переключения между формами
const showPhoneLogin = ref(true);

// Обработчики переключения
const switchToPhone = () => {
  showPhoneLogin.value = true;
};

const switchToPassword = () => {
  showPhoneLogin.value = false;
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <!-- Заголовок и навигация -->
    <div class="flex gap-x-2">
      <RouterLink to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </RouterLink>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">Город</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">Улица</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="font-bold text-2xl">Вход</p>
    </div>

    <!-- Кнопки переключения -->
    <div class="relative flex gap-x-2 mb-6">
      <button
        @click="switchToPhone"
        class="w-[20vw] h-[5vh] text-black font-medium"
      >
        По телефону
      </button>
      <button
        @click="switchToPassword"
        class="w-[20vw] h-[5vh] text-black font-medium"
      >
        По паролю
      </button>
      <!-- Анимированная нижняя линия -->
      <div class="absolute bottom-0 left-0 w-[40vw] h-[2px]">
        <div
          class="w-[20vw] h-[2px] bg-black transition-transform duration-300 ease-in-out"
          :class="{ 'translate-x-0': showPhoneLogin, 'translate-x-[20vw]': !showPhoneLogin }"
        ></div>
      </div>
    </div>

    <!-- Формы входа -->
    <div>
      <LoginByPhone v-show="showPhoneLogin" />
      <LoginByPassword v-show="!showPhoneLogin" />
    </div>
  </div>
</template>

<style scoped>
</style>