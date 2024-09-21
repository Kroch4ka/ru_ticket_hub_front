import {defineStore} from "pinia";
import {reactive} from "vue";
import {apiGetProfile} from "../shared/backend_api.js";

export const useProfileStore = defineStore('profile', () => {
    const state = reactive({
        profile: {},
        isAuthenticated: false
    })

    const fetchProfile = async() => {
        try {
            state.profile = await apiGetProfile()
            state.isAuthenticated = true
        } catch {
            state.isAuthenticated = false
        }
    }

    return { state, fetchProfile }
})
