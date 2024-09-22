<script setup>
import {onMounted, reactive, ref} from "vue";
import {apiGetCompanies} from "../../shared/backend_api.js";
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const companies = ref(null)
const fetchCompanies = async() => {
  companies.value = await apiGetCompanies()
}
onMounted(fetchCompanies)
</script>

<template>
  <div class="p-5" v-if="companies">
    <div class="flex items-center justify-between">
      <span class="font-bold">Companies</span>
      <div class="flex gap-2">
        <Select placeholder="Any status"/>
        <Select placeholder="Newest first"/>
      </div>
    </div>
    <DataTable class="mt-4" :value="companies">
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Category"></Column>
      <Column field="action" header="">
        <template #body="slot">
          <Button severity="primary">
            Создать тикет
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
