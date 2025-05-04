<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

</script>

<template>
<div class="w-[40vw] mx-auto py-6">
<div class="flex flex-row w-[40vw] h-auto   mx-auto">
<router-link to="/login">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
    <p class="font-bold text-2xl mt-[0.5vh]">{{ t('myRecords') }}</p>
    </div>

</div>
</template>