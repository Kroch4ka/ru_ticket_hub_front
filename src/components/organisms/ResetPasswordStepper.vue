<script setup>
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import {ref} from "vue";
import {useRouter} from "vue-router";
import InputOtp from 'primevue/inputotp';
import {apiResetFinalize, apiResetPasswordRequest, apiResetPasswordVerifyToken} from "../../shared/backend_api.js";

const router = useRouter()

const email = ref("")
const otp = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const onClickBackToLogin = () => {
  router.back()
}
const onClickRequestEmail = async(activateCallback) => {
  await apiResetPasswordRequest({ email: email.value })
  activateCallback('2')
}
const onClickVerifyToken = async(activateCallback) => {
  await apiResetPasswordVerifyToken({ resetPasswordToken: otp.value })
  activateCallback('3')
}
const onClickFinalizeReset = async(activateCallback) => {
  await apiResetFinalize({
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    resetPasswordToken: otp.value
  })
  activateCallback('4')
}
</script>

<template>
  <Stepper
    value="1"
    linear="false"
  >
    <StepList>
      <Step value="1">
        Ввод email
      </Step>
      <Step value="2">
        Верификация
      </Step>
      <Step value="3">
        Установка нового пароля
      </Step>
    </StepList>
    <StepPanels>
      <StepPanel
        v-slot="{ activateCallback }"
        value="1"
      >
        <Card>
          <template #title>
            Reset Your Password?
          </template>
          <template #subtitle>
            <div class="mt-2 mb-2">
              Enter your email for instructions
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2">
                <label for="email">Registered Email</label>
                <InputText
                  id="email"
                  v-model="email"
                  aria-describedby="Email"
                />
              </div>
              <Button
                label="Reset password"
                severity="primary"
                @click="onClickRequestEmail(activateCallback)"
              />
              <Button
                label="Back to Login"
                severity="secondary"
                @click="onClickBackToLogin"
              />
            </div>
          </template>
        </Card>
      </StepPanel>
      <StepPanel
        v-slot="{ activateCallback }"
        value="2"
      >
        <Card class="flex">
          <template #title>
            Verification
          </template>
          <template #subtitle>
            <div class="mt-2 mb-2">
              We have sent code to you email
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-5">
              <InputOtp
                v-model="otp"
                :length="6"
              />
              <div class="flex gap-3">
                <Button
                  label="Verify"
                  severity="primary"
                  @click="onClickVerifyToken(activateCallback)"
                />
                <Button
                  label="Cancel"
                  severity="secondary"
                  @click="activateCallback('1')"
                />
              </div>
            </div>
          </template>
        </Card>
      </StepPanel>
      <StepPanel
        v-slot="{ activateCallback }"
        value="3"
      >
        <Card>
          <template #title>
            Set new password
          </template>
          <template #content>
            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2">
                <label for="password">New password</label>
                <InputText
                  id="password"
                  v-model="password"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="password_confirmation">Confirm password</label>
                <InputText
                  id="password_confirmation"
                  v-model="passwordConfirmation"
                />
              </div>
              <Button
                label="Confirm"
                severity="primary"
                @click="onClickFinalizeReset(activateCallback)"
              />
            </div>
          </template>
        </Card>
      </StepPanel>
      <StepPanel
        v-slot="{ activateCallback }"
        value="4"
      >
        <Card>
          <template #title>
            Congratulations!
          </template>
          <template #content>
            <Button
              label="Cancel"
              severity="primary"
              @click="activateCallback('1')"
            />
          </template>
        </Card>
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>

<style scoped>

</style>