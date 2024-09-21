<script setup>
import {reactive} from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from 'primevue/button';
import {apiAccountLogin} from "../../shared/backend_api.js";
import {useRouter} from "vue-router";
import {useProfileStore} from "../../stores/profile.js";

const router = useRouter()
const profileStore = useProfileStore()
const form = reactive({
  email: "",
  password: ""
})

const onClickLogIn = async() => {
  const result = await apiAccountLogin({ email: form.email, password: form.password })
  localStorage.setItem('access_token', result.token)
  await router.push('/')
}
</script>

<template>
  <Card>
    <template #title>
      WelCome Back!
    </template>
    <template #subtitle>
      Please enter your details to sign in
    </template>
    <template #content>
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="username">Email</label>
          <InputText
            id="username"
            v-model="form.email"
            aria-describedby="Email"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <Password id="password" v-model="form.password" :feedback="false" aria-describedby="password-help"/>
          <router-link to="reset_password" id="password-help">Forgot password</router-link>
        </div>
        <Button
          label="Log in"
          severity="primary"
          @click="onClickLogIn"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>