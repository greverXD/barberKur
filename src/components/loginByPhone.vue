<script setup>
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/global';

const store = useGlobalStore();

// Реактивная переменная для номера телефона
const phone = ref(store.loginData.phone);

// Обновление данных в Pinia
const updateField = (field, value) => {
  store.updateLoginData(field, value);
};

// Проверка валидности телефона
const isPhoneValid = computed(() => {
  return phone.value.trim() !== '';
});

// Обработчик отправки кода
const submitPhone = () => {
  if (isPhoneValid.value) {
    console.log('Отправка кода на телефон:', phone.value);
    // Здесь можно добавить логику отправки кода (например, API-запрос)
    store.clearLoginData(); // Очищаем данные после отправки
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <input
      v-model="phone"
      @input="updateField('phone', $event.target.value)"
      type="tel"
      placeholder="Номер телефона"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <button
      :disabled="!isPhoneValid"
      @click="submitPhone"
      class="w-full h-[6vh] rounded-xl"
      :class="isPhoneValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
    >
      Отправить код
    </button>
  </div>
</template>

<style scoped>
</style>