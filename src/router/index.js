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
            name: 'activate',
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
<<<<<<< Updated upstream
    if (profileStore.state.isAuthenticated && to.name === 'log-in' || to.name === 'reset-password') {
        return { name: 'main' }
=======
    if (profileStore.state.isAuthenticated && !profileStore.state.profile.active && to.name !== 'activate') {
        return { name: 'activate' }
    }
    if (profileStore.state.isAuthenticated && !checkPermission(to.path, profileStore.state.profile.profileable_type) && to.name !== 'sorry' && to.name !== 'activate') {
        return { name: 'sorry' }
>>>>>>> Stashed changes
    }
    if (!profileStore.state.isAuthenticated && to.name === 'main') {
        return { name: 'log-in' }
    }
})

export default router