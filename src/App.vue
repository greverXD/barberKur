<script setup>
import {ref,reactive,computed} from "vue"
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import { RouterLink, RouterView, useRouter } from 'vue-router'
import arrow from "@/assets/arrow.png";
import InputBlock from "./components/inputBlock.vue";
import MoreBlock from "./components/moreBlock.vue";
import CompletedBlock from "./components/completedBlock.vue";
import ButtonTime from "./components/ui/buttonTime.vue";
import { Toggle } from "reka-ui";

const toggleBlockOne = ref(true)
const toggleBlockTwo = ref(true)
const toggleOne = () =>{
  toggleBlockOne.value = !toggleBlockOne.value
}
const toggleTwo = () =>{
  toggleBlockTwo.value = !toggleBlockTwo.value
}
const blocks = [
  {
    moreLabel: "Удлинённая стрижка",
    time: "40 мин",
    text: "Длина волос от 4 см и более.Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами,с возможным использованием триммера для создания более точной окантовки",
    
    moneyOne:"40",
    moneyTwo:"45"
  }
]
const times = [ '12:10','12:20','12:30','12:40','12:50','12:00' , '12:10','12:20','12:30','12:40','12:50' , '12:10','12:20','12:30','12:40','12:50']
</script>

<template>

  <div>


    <div class="flex flex-col mx-auto w-[50vw] h-[15vh]">

      
     <div class="flex gap-x-2 ">
  <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]">
  <div class="flex rounded-full bg-gray-400 w-[3vw] h-[6vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>

       <div class="flex flex-col  mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-1xl">Город</p><router-link to="/hehe"><img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px] "></router-link></div>
     <p class="text-0.2xl text-bold">Улица</p>
   </div> 
  </div>


        <div class="flex flex-row w-[50vw] h-[10vh]">
          <div class="flex items-center w-[40vw]">
            День
          </div>
          
          
          <div class="flex items-center justify-center" @click="toggleOne()">
            <img :src = "arrow" class="w-[1.5vw] h-[3vh]  justify-between" :class="toggleBlockOne ? 'rotate-0' : 'rotate-180'">
          </div>  
         </div> 
    </div>  

    <div v-show="toggleBlockOne" class="flex flex-row mx-auto w-[50vw] h-auto flex-wrap gap-4">
         <ButtonTime  v-for="(time,index) in times" :key="index" :time="time"/>  
    </div> 
    <div class="flex mx-auto w-[50vw] h-[10vh]">
        <div class="flex flex-row w-[50vw] h-[10vh]">
          <div class="flex items-center w-[40vw]">
            Вечер
          </div>
          
          
          <div class="flex items-center justify-center" @click="toggleTwo()">
            <img :src = "arrow" class="w-[1.5vw] h-[3vh] justify-between" :class="toggleBlockTwo ? 'rotate-0' : 'rotate-180'">
          </div>  
         </div> 
    </div>  

    <div v-show="toggleBlockTwo" class="flex flex-row mx-auto w-[50vw] h-auto flex-wrap gap-4">
         <ButtonTime v-for="(time,index) in times" :key="index" :time="time"/>  
    </div>  


    

  <!-- <header>
     <InputBlock/>

    
  </header> -->












<!-- 
  Основной блок
<div class="w-[40vw] h-[50vh]   mx-auto">
  <div class="flex w-[40vw] h-[10vh] justify-end ">
  <div class="flex  items-center justify-center">
      <img :src = "img" class="w-[1.5vw] h-[3vh]">
       </div>
  </div>      
  <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>
  <div class="flex flex-col gap-y-2 mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-4xl">Город</p><router-link to="/hehe"><img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px] "></router-link></div>
     <p class="text-1xl text-bold">Улица</p>
   </div> 
<div class="flex gap-y-2 flex-col">
<InputBlock v-for="(item,index) in items" 
            :key="index"
            :label="item.label"
            :img="item.img"
            :icon="item.icon"
            />
</div>
</div>            
<router-view/> -->



<!-- <div @click="router.push(item.link)"> 
  hehe router
</div>

<router-link
  to="/"
>
home
</router-link>

<router-link
  to="/hehe"
>
hehe
</router-link> -->

</div>
</template>


