<script setup>
import { useGlobalStore } from '@/stores/global';
import { RouterLink } from 'vue-router';

const store = useGlobalStore();


</script>

<template>
  
<div
  v-if="store.selectedBlocks.time "
  class="fixed  bottom-0 z-50 bg-white rounded-lg shadow-md mx-auto "
>
    
    <div class="flex w-[40vw] flex-row justify-between gap-y-4 ">
      <div>
      <div> 
        <ul>
          <li v-for="(block, index) in store.selectedBlocks" :key="index">
            {{ block.moreLabel }}
          </li>
        </ul>  
      </div>
      </div>
      <div>
      <div>
        <p class="text-gray-600">{{ formattedTime }}</p>
      </div>
      <div>
        <p class="text-gray-600">
          {{ priceRange.min }}-{{ priceRange.max }} byn
        </p>
      </div>
      </div>
    </div>

<router-link to="/master">
    <div class="flex justify-center w-[40vw] bg-black text-white">
      <button>Записаться</button>
     </div> 
     </router-link>
  </div>
 
</template>

<style scoped>
</style>