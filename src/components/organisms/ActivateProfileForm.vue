<script setup>

import Button from "primevue/button";
import Card from "primevue/card";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import {reactive} from "vue";
import {apiActivateProfile} from "../../shared/backend_api.js";
import {useProfileStore} from "../../stores/profile.js";
import {useRouter} from "vue-router";
import useAuth from '../../composables/auth.js'

useAuth()

const form = reactive({
  name: '',
  phoneNumber: ''
})
const profileStore = useProfileStore()
const router = useRouter()

const onClickActivateProfile = async() => {
  await apiActivateProfile({ phoneNumber: form.phoneNumber, name: form.name })
  profileStore.state.profile.active = true
  await router.push('/')
}
</script>

<template>
  <div class="container flex items-center justify-center w-full max-w-full h-dvh">
    <Card>
      <template #title>
        Activate your profile!
      </template>
      <template #subtitle>
        Please enter your details
      </template>
      <template #content>
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <InputText
                id="name"
                v-model="form.name"
                aria-describedby="name"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="phone_number">Phone number</label>
            <InputText
                id="phone_number"
                v-model="form.phoneNumber"
                aria-describedby="phone_number"
            />
          </div>
          <Button
              label="Finish!"
              severity="primary"
              @click="onClickActivateProfile"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>