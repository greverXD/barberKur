<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import arrow from '@/assets/arrow.png';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');

const router = useRouter();
const email = ref('');
const password = ref('');
const name = ref('');
const errorMessage = ref('');

const register = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value, name: name.value }),
    });
    if (response.ok) {
      router.push('/loginBy');
    } else {
      const data = await response.json();
      errorMessage.value = data.message || t('registrationError');
    }
  } catch (error) {
    errorMessage.value = t('errorOccurred');
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
      <p class="font-bold text-2xl">{{ t('register') }}</p>
    </div>

    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">{{ t('name') }}</label>
        <input v-model="name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">{{ t('email') }}</label>
        <input v-model="email" type="email" id="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">{{ t('password') }}</label>
        <input v-model="password" type="password" id="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>
      <button type="submit" class="w-full bg-black text-white py-2 rounded-md">{{ t('registerButton') }}</button>
    </form>

    <div v-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>