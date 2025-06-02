<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useGlobalStore();

const masterId = Number(route.params.id);
const stars = Number(route.params.stars);
const comment = ref('');

const submitReview = () => {
  if (comment.value.trim()) {
    store.addReview(masterId, { stars, comment: comment.value });
    router.push(`/master/${masterId}`);
  }
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2 mb-4">
      <router-link :to="`/master/${masterId}`">
        <img src="@/assets/arrow.png" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">{{ t('city') }}</p>
          <img src="@/assets/arrow.png" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">{{ t('street') }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-y-4">
      <p class="font-bold text-2xl">{{ t('submitReview') }}</p>
      <div>
        <p class="font-bold">{{ t('rating') }}</p>
        <div class="flex gap-x-2">
          <span v-for="i in 5" :key="i" class="text-2xl" :class="i <= stars ? 'text-yellow-400' : 'text-gray-400'">
            ★
          </span>
        </div>
      </div>
      <div>
        <p class="font-bold">{{ t('reviewComment') }}</p>
        <textarea
          v-model="comment"
          class="w-full h-[20vh] border rounded-xl p-4"
          :placeholder="t('reviewComment')"
        ></textarea>
      </div>
      <button
        @click="submitReview"
        class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800"
        :disabled="!comment.trim()"
      >
        {{ t('submitReview') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>