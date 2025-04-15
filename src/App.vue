<script setup>
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import arrow from "@/assets/arrow.png";
import MoreBlock from "@/components/moreBlock.vue";
import { useRoute } from "vue-router";
import CompletedBlock from "./components/completedBlock.vue";
import InputBlock from "@/components/inputBlock.vue";
import five from "@/assets/five.png";




</script>

<template>
   
   <router-view />

   <!-- <div class="w-[40vw] h-[50vh] mx-auto">
      
  <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center mt-[15vh]">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>
  
</div>  -->




</template>