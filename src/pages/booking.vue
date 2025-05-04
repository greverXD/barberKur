<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import arrow from '@/assets/arrow.png';

const router = useRouter();
const store = useGlobalStore();

// Реактивные переменные для полей формы
const email = ref(store.bookingData.email);
const phone = ref(store.bookingData.phone);
const name = ref(store.bookingData.name);
const comment = ref(store.bookingData.comment);
const agreement1 = ref(store.bookingData.agreement1);
const agreement2 = ref(store.bookingData.agreement2);

// Реактивные переменные для отслеживания взаимодействия с чекбоксами
const hasInteracted1 = ref(false);
const hasInteracted2 = ref(false);

// Обновление данных в Pinia при изменении полей
const updateField = (field, value) => {
  store.updateBookingData(field, value);
};

// Отслеживание взаимодействия с чекбоксами
const updateAgreement1 = (checked) => {
  hasInteracted1.value = true;
  updateField('agreement1', checked);
};

const updateAgreement2 = (checked) => {
  hasInteracted2.value = true;
  updateField('agreement2', checked);
};

// Проверка валидности формы
const isFormValid = computed(() => {
  return (
    email.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    name.value.trim() !== '' &&
    agreement1.value &&
    agreement2.value
  );
});

// Обработчик отправки формы
const submitBooking = () => {
  if (isFormValid.value) {
    // Здесь можно отправить данные на сервер или выполнить другие действия
    console.log('Бронирование:', {
      services: store.selectedBlocks,
      master: store.selectedMaster,
      time: store.selectedTime,
      bookingData: store.bookingData,
    });
    store.clearAll(); // Очищаем данные после бронирования
    router.push({ name: 'home' }); // Перенаправляем на главную страницу
  }
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <!-- Заголовок и навигация -->
    <div class="flex gap-x-2">
      <router-link to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">Город</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">Улица</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="font-bold text-2xl">Подтверждение бронирования</p>
    </div>

    <!-- Выбранные данные -->
    <div class="mb-6">
      <p class="font-bold">Выбранные услуги:</p>
      <ul class="list-disc pl-5">
        <li v-for="block in store.selectedBlocks" :key="block.moreLabel">
          {{ block.moreLabel }} ({{ block.timeWork }})
        </li>
      </ul>
      <p class="mt-2"><span class="font-bold">Специалист:</span> {{ store.selectedMaster?.name || 'Не выбран' }}</p>
      <p><span class="font-bold">Время:</span> {{ store.selectedTime || 'Не выбрано' }}</p>
    </div>

    <!-- Форма ввода -->
    <div class="flex flex-col gap-y-4">
      <input
        v-model="email"
        @input="updateField('email', $event.target.value)"
        type="email"
        placeholder="Электронная почта"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <input
        v-model="phone"
        @input="updateField('phone', $event.target.value)"
        type="tel"
        placeholder="Телефон"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <input
        v-model="name"
        @input="updateField('name', $event.target.value)"
        type="text"
        placeholder="Имя"
        class="w-full h-[6vh] rounded-xl p-4 border"
      />
      <textarea
        v-model="comment"
        @input="updateField('comment', $event.target.value)"
        placeholder="Комментарий"
        class="w-full h-[12vh] rounded-xl p-4 border"
      ></textarea>
    </div>

    <!-- Соглашения -->
    <div class="mt-4">
      <label class="flex items-center gap-x-2">
        <input
          v-model="agreement1"
          @change="updateAgreement1($event.target.checked)"
          type="checkbox"
          class="w-5 h-5"
        />
        <span>Я согласен с условиями предоставления услуг</span>
      </label>
      <p v-if="!agreement1 && hasInteracted1" class="text-red-500 text-sm mt-1">
        Необходимо согласиться с условиями
      </p>

      <label class="flex items-center gap-x-2 mt-4">
        <input
          v-model="agreement2"
          @change="updateAgreement2($event.target.checked)"
          type="checkbox"
          class="w-5 h-5"
        />
        <span>Я согласен на обработку персональных данных</span>
      </label>
      <p v-if="!agreement2 && hasInteracted2" class="text-red-500 text-sm mt-1">
        Необходимо согласиться на обработку данных
      </p>
    </div>

    <!-- Кнопка "Записаться" -->
    <div class="mt-6">
      <button
        :disabled="!isFormValid"
        @click="submitBooking"
        class="w-full h-[6vh] rounded-xl"
        :class="isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
      >
        Записаться
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>