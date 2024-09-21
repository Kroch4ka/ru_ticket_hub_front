import {useProfileStore} from "../stores/profile.js";
import {onBeforeMount, onMounted} from "vue";
import {useRouter} from "vue-router";

export default () => {
    const profileStore = useProfileStore()
    const router = useRouter()

    onBeforeMount(async() => {
        await profileStore.fetchProfile()
        if (!profileStore.state.isAuthenticated) {
            await router.push('/auth')
        } else if (profileStore.state.isAuthenticated && !profileStore.state.profile.active) {
            await router.push('/activate')
        } else {
            await router.push('/')
        }
    })
}
