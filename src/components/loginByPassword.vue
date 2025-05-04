<script setup>
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useGlobalStore();

// Реактивные переменные для логина и пароля
const email = ref(store.loginData.email);
const password = ref(store.loginData.password);

// Обновление данных в Pinia
const updateField = (field, value) => {
  store.updateLoginData(field, value);
};

// Проверка валидности формы
const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '';
});

// Обработчик входа
const submitLogin = () => {
  if (isFormValid.value) {
    console.log('Вход с данными:', { email: email.value, password: password.value });
    // Здесь можно добавить логику авторизации (например, API-запрос)
    store.clearLoginData(); // Очищаем данные после входа
    router.push({ name: 'home' }); // Перенаправляем на главную страницу
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <input
      v-model="email"
      @input="updateField('email', $event.target.value)"
      type="email"
      placeholder="Электронная почта"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <input
      v-model="password"
      @input="updateField('password', $event.target.value)"
      type="password"
      placeholder="Пароль"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <button
      :disabled="!isFormValid"
      @click="submitLogin"
      class="w-full h-[6vh] rounded-xl"
      :class="isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
    >
      Войти
    </button>
  </div>
</template>

<style scoped>
</style>