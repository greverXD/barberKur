<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useGlobalStore();

const masterId = Number(route.params.id);
const master = computed(() => store.barbers.find(b => b.id === masterId) || {});
const averageRating = computed(() => {
  if (!master.value.id) return 0;
  return store.getAverageRating(masterId);
});
const reviewCount = computed(() => master.value.reviews?.length || 0);
const showAllReviews = ref(false);

const visibleReviews = computed(() =>
  showAllReviews.value ? master.value.reviews || [] : (master.value.reviews || []).slice(0, 5)
);

const rateMaster = (stars) => {
  router.push(`/master/${masterId}/review/${stars}`);
};

const selectMaster = () => {
  store.setSelectedMaster(master.value);
  store.clearSelectedBlocks();
  router.push({ name: 'time' });
};

const toggleReviews = () => {
  showAllReviews.value = !showAllReviews.value;
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2 mb-4">
      <router-link to="/master">
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

    <div v-if="master.id" class="flex flex-col gap-y-4">
      <div class="flex flex-col items-center">
        <img :src="master.img" class="w-[12vw] h-[12vw] rounded-full mb-2" />
        <p class="font-bold text-xl">{{ t(master.name) }}</p>
        <p class="text-gray-600">{{ t(master.role) }}</p>
        <div class="flex items-center gap-x-2 mt-2">
          <span>{{ averageRating }} ★</span>
          <span>({{ reviewCount }} {{ t('reviewCount') }})</span>
        </div>
      </div>

      <div class="mt-4">
        <p class="font-bold">{{ t('bio') }}</p>
        <p class="text-gray-600">{{ t(master.bio || 'noBio') }}</p>
      </div>

      <div class="mt-4">
        <p class="font-bold">{{ t('rateAndReview') }}</p>
        <div class="flex gap-x-2 mt-2">
          <button
            v-for="i in 5"
            :key="i"
            class="text-2xl"
            :class="i <= 5 ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400'"
            @click="rateMaster(i)"
          >
            ★
          </button>
        </div>
      </div>

      <div class="mt-4">
        <p class="font-bold">{{ t('reviews') }}</p>
        <div v-if="visibleReviews.length === 0" class="text-gray-500">
          {{ t('noReviews') }}
        </div>
        <div v-else class="flex flex-col gap-y-4">
          <div v-for="review in visibleReviews" :key="review.id" class="p-4 border rounded-xl">
            <p class="font-bold">{{ review.stars }} ★</p>
            <p class="text-gray-600">{{ review.comment }}</p>
          </div>
          <button
            v-if="reviewCount > 5"
            @click="toggleReviews"
            class="text-blue-500 hover:underline mt-2"
          >
            {{ showAllReviews ? t('hide') : t('moreReviews') }}
          </button>
        </div>
      </div>

      <button
        @click="selectMaster"
        class="w-full h-[6vh] bg-black text-white rounded-xl hover:bg-gray-800 mt-4"
      >
        {{ t('selectMaster') }}
      </button>
    </div>
    <div v-else class="text-gray-500">
      {{ t('masterNotFound') }}
    </div>
  </div>
</template>

<style scoped>
</style>