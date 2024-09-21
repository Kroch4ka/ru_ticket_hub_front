import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "../components/views/AuthView.vue";
import LoginForm from "../components/organisms/LoginForm.vue";
import ResetPasswordStepper from "../components/organisms/ResetPasswordStepper.vue";
import MainView from "../components/views/MainView.vue";
import ActivateProfileForm from "../components/organisms/ActivateProfileForm.vue";
import {useProfileStore} from "../stores/profile.js";
import Dashboard from "../components/organisms/Dashboard.vue";
import Tickets from "../components/organisms/Tickets.vue";
import checkPermission from "../shared/check-permission.js";
import SorryView from "../components/views/SorryView.vue";
import Companies from "../components/organisms/Companies.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard
                },
                {
                    path: 'tickets',
                    name: 'tickets',
                    component: Tickets
                },
                {
                    path: 'companies',
                    name: 'companies',
                    component: Companies
                }
            ]
        },
        {
            path: '/sorry',
            name: 'sorry',
            component: SorryView
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
    if (profileStore.state.isAuthenticated && !checkPermission(to.path, profileStore.state.profile.profileable_type) && to.name !== 'sorry') {
        return { name: 'sorry' }
    }
    if (!profileStore.state.isAuthenticated && to.name !== 'log-in' && to.name !== 'reset-password' && to.name !== 'sign-up') {
        return { name: 'log-in' }
    }
})

export default router