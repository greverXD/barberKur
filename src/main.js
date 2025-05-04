import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n';
import en from '@/locales/eng';
import ru from '@/locales/ru';
import App from './App.vue'
import router from './router'

import { useStorage } from '@vueuse/core'


const locale = useStorage('app-locale')


const i18n = createI18n({
    locale: locale.value || 'ru',
    messages: {
      en, 
      ru 
    }
  });
const app = createApp(App)
const pinia = createPinia()
app.use(createPinia())
app.use(router)
app.use(pinia)
app.mount('#app')
app.use(i18n)
