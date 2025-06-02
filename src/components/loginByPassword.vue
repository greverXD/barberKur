<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

const store = useGlobalStore();
const { t } = useI18n();
const router = useRouter();
const localLang = useStorage('app-locale', 'ru');



const email = ref(store.loginData.email);
const password = ref(store.loginData.password);
const errorMessage = ref('');

const updateField = (field, value) => {
  store.updateLoginData(field, value);
};

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '';
});

const submitLogin = async () => {
  if (isFormValid.value) {
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        store.clearLoginData();
        router.push({ name: 'login' });
      } else {
        errorMessage.value = t('invalidCredentials');
      }
    } catch (error) {
      errorMessage.value = t('loginError');
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <input
      v-model="email"
      @input="updateField('email', $event.target.value)"
      type="email"
      :placeholder="t('email')"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <input
      v-model="password"
      @input="updateField('password', $event.target.value)"
      type="password"
      :placeholder="t('password')"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <button
      :disabled="!isFormValid"
      @click="submitLogin"
      class="w-full h-[6vh] rounded-xl"
      :class="isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
    >
      {{ t('login') }}
    </button>
    <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
</style>