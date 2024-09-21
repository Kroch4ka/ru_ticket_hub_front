import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from "./router/index.js";
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";
import Aura from '@primevue/themes/aura';

createApp(App)
    .use(createPinia())
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark',
            }
        }
    })
    .use(Router)
    .mount('#app')
