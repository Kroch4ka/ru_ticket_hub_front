import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "../components/views/AuthView.vue";
import LoginForm from "../components/organisms/LoginForm.vue";
import ResetPasswordStepper from "../components/organisms/ResetPasswordStepper.vue";
import MainView from "../components/views/MainView.vue";
import ActivateProfileForm from "../components/organisms/ActivateProfileForm.vue";
import {useProfileStore} from "../stores/profile.js";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView
        },
        {
            path: '/activate',
            name: 'activate-profile',
            component: ActivateProfileForm
        },
        {
            path: '/auth',
            name: 'auth',
            children: [
                {
                    path: '',
                    name: 'log-in',
                    component: LoginForm
                },
                {
                    path: 'reset_password',
                    name: 'reset-password',
                    component: ResetPasswordStepper
                }
            ],
            component: AuthView
        }
    ]
})

router.beforeEach(async(to, from) => {
    const profileStore = useProfileStore()
    await profileStore.fetchProfile()
    if (profileStore.state.isAuthenticated && to.name === 'log-in' || to.name === 'reset-password') {
        return { name: 'main' }
    }
    if (!profileStore.state.isAuthenticated && to.name === 'main') {
        return { name: 'log-in' }
    }
})

export default router