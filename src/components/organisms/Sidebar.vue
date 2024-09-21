<script setup>

import MainLogo from "../atoms/MainLogo.vue";
import {computed, ref} from "vue";
import ToggleSwitch from "primevue/toggleswitch";
import {apiAccountLogout} from "../../shared/backend_api.js";
import {useRouter} from "vue-router";
import {useProfileStore} from "../../stores/profile.js";
import checkPermission from "../../shared/check-permission.js";

const isDarkTheme = ref(false)
const router = useRouter()
const profileStore = useProfileStore()
const mainLinks = computed(() => {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: "pi-chart-bar"
    },
    {
      title: "Tickets",
      to: "/tickets",
      icon: "pi-inbox"
    },
    {
      title: "Companies",
      to: "/companies",
      icon: "pi-inbox"
    }
  ].filter((link) => checkPermission(link.to, profileStore.state.profile.profileable_type))
})
const footerLinks = computed(() => {
  return [
    {
      title: "Settings",
      to: "/settings",
      icon: "pi-wrench"
    }
  ]
})

const onClickLogout = async() => {
  await apiAccountLogout()
  localStorage.removeItem('access_token')
  await router.push('/auth')
}
</script>

<template>
  <div class="h-lvh col-span-2">
    <div class="pl-5 pb-6 h-lvh flex flex-col justify-between">
      <div>
        <div class="flex pl-0 border-b-2 border-dotted p-5 pr-0 flex-row items-center justify-between">
          <div class="flex gap-2 items-center">
            <MainLogo/>
            <span class="font-bold text-2xl">Botizo</span>
          </div>
          <div class="pi pi-step-backward"></div>
        </div>
        <div class="mt-4">
          <div class="rounded-xl hover:bg-green-200" v-for="link in mainLinks" :key="link.to">
            <router-link :to="link.to">
              <div class="pt-2 pb-2 pl-3 flex flex-row gap-2 items-baseline">
                <span class="pi" :class="link.icon"></span>
                <span>{{link.title}}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div>
        <div class="border-b-2 border-dotted">
          <div class="rounded-xl" v-for="link in footerLinks" :key="link.to">
            <router-link :to="link.to">
              <div class="pt-2 pb-2 pl-3 flex flex-row gap-2 items-baseline">
                <span class="pi" :class="link.icon"></span>
                <span>{{link.title}}</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="pi pi-sun"></span>
            <ToggleSwitch v-model="isDarkTheme"/>
            <span class="pi pi-moon"></span>
          </div>
          <span @click="onClickLogout" class="pi p-1 hover:cursor-pointer pi-sign-out"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>