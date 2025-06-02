<script setup>
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import arrow from "@/assets/arrow.png";
import MoreBlock from "@/components/moreBlock.vue";
import { useRoute } from "vue-router";
import CompletedBlock from "./components/completedBlock.vue";
import InputBlock from "@/components/inputBlock.vue";

import People from "@/components/people.vue";
import ButtonRecord from "./components/ui/buttonRecord.vue";


</script>

<template>
   
   <router-view />

</template>