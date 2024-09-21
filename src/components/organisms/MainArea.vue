<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="max-w-full col-span-10">
    <div class="flex items-center pt-3 pb-3 h-dvh justify-center">
      <div class="w-3/4 rounded-lg h-full border-2 basis-10/12 bg-white">
        <div class="border-b-2 border-solid">
          <div class="p-3 pl-4 pr-4">
            <div>
              <span class="text-xl font-bold">{{route.name}}</span>
            </div>
          </div>
        </div>
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>