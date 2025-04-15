<script setup>
import people from "@/assets/people.png";
import five from "@/assets/five.png";
import arrow from "@/assets/arrow.png";
import Master from "@/components/master.vue";
const masters = [
  {
   name: 'ИмяЧеловека',
   master:'ДолжностьЧеловека',
   day:'вт',
   time:'12:00',
   timeDay: '12:00',
   img: five,
  }
]

</script>

<template>
   


   <div class="w-[40vw] h-[50vh]   mx-auto">
  <div class="flex gap-x-2">
    <router-link to="/"> <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]"></router-link>
  <div class="flex rounded-full bg-gray-400 w-[3vw] h-[6vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]" > 
       </div>

       <div class="flex flex-col  mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-1xl">Город</p><img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px] "></div>
     <p class="text-0.2xl text-bold">Улица</p>
   </div> 
  </div>



   <div class="text-2xl font-bold">Выбрать специалиста</div>

   <div class="flex w-[35vw] h-[10vh]  flex-row justify-between" >
      <div class="flex flex-row  items-center gap-x-2">
        <div class="flex rounded-full bg-blue-100 w-[2.5vw] h-[5vh] items-center justify-center">
      <img :src = "people" class="w-[1.5vw] h-[3vh]">
         </div>
      <div>
        Любой специалиста
       </div>
       </div>
       
       
       <div class="flex flex-row  items-center">

        
        <div><input type="checkbox"></div>
     </div>
   </div> 

    <Master v-for="(master,index) in masters"
    :key="index"
    :name = "master.name"
    :master = "master.master"
    :time = "master.time"
    :timeDay = "master.timeDay"
    :img = "master.img"
    />
    
  </div>



 



</template>