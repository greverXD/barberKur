<script setup>
import {ref,reactive,computed} from "vue"
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import { RouterLink, RouterView, useRouter } from 'vue-router'
import arrow from "@/assets/arrow.png";
import InputBlock from "@/components/inputBlock.vue";
import MoreBlock from "@/components/moreBlock.vue";
import CompletedBlock from "@/components/completedBlock.vue";

const items =[
  {
    img: people,
    label:"Выбрать специалиста",
    icon:arrow
  },
  {
    img: calendar,
    label:"Выбрать дату и время",
    icon:arrow
  },
  {
    img: list,
    label:"Выбрать услуги",
    icon:arrow
  },
]


</script>

<template>
   
   <div class="w-[40vw] h-[50vh]   mx-auto">
  <div class="flex gap-x-2">
  <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]">
  <div class="flex rounded-full bg-gray-400 w-[3vw] h-[6vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>

       <div class="flex flex-col  mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-1xl">Город</p><router-link to="/hehe"><img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px] "></router-link></div>
     <p class="text-0.2xl text-bold">Улица</p>
   </div> 
  </div>  
  
  
  <div>
    <p class="font-bold text-2xl">Выбрать услуги</p>
  </div>
  
  
  <div class="flex gap-x-2">
 
    <div>
      <button class="rounded-full w-[8vw] h-[5vh] bg-black text-white">ТОП-МАСТЕР</button>
    </div>
   
    <div>
      <button class="rounded-full w-[5vw] h-[5vh] hover:bg-gray-400">МАСТЕР</button>
    </div>  


  </div>  


  <input type="text" placeholder="Найти" class="w-[35vw] h-[6vh] rounded-xl p-4">

  <p  class="font-bold text-2xl">ТОП-МАСТЕР</p>


  <div class="flex flex-col">
      <MoreBlock v-for="(block,index) in blocks"
      :key="index"
      :moreLabel="block.moreLabel"
      :text="block.text"
      :time="block.time"

      :moneyOne="block.moneyOne"
      :moneyTwo="block.moneyTwo"
      />
  </div>  
</div>
</template>