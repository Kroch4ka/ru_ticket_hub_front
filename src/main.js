import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from "./components/router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createApp(App)
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
