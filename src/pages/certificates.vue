<script setup>
import arrow from "@/assets/arrow.png";
</script>

<template>

<div class="flex flex-row w-[40vw] h-[50vh]   mx-auto">
<router-link to="/login">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
<p class="font-bold text-2xl mt-[0.5vh]">Мои сертификаты</p>
</div>
</template>