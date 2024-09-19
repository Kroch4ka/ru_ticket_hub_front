import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "../views/AuthView.vue";
import LoginForm from "../molecules/LoginForm.vue";
import ResetPasswordStepper from "../organisms/ResetPasswordStepper.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
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
export default router