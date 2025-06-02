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

const phone = ref(store.loginData.phone);

const updateField = (field, value) => {
  store.updateLoginData(field, value);
};

const isPhoneValid = computed(() => {
  return phone.value.trim() !== '';
});

const submitPhone = () => {
  if (isPhoneValid.value) {
    console.log('Sending code to phone:', phone.value);
    store.clearLoginData();
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <input
      v-model="phone"
      @input="updateField('phone', $event.target.value)"
      type="tel"
      :placeholder="t('phoneNumber')"
      class="w-full h-[6vh] rounded-xl p-4 border"
    />
    <button
      :disabled="!isPhoneValid"
      @click="submitPhone"
      class="w-full h-[6vh] rounded-xl"
      :class="isPhoneValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
    >
      {{ t('sendCode') }}
    </button>
  </div>
</template>

<style scoped>
</style>