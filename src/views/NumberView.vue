<template>
  <div>
    <h2>Number Data</h2>

    <!-- Display loading message while data is being fetched -->
    <div v-if="loading">Loading...</div>

    <!-- Display error message if there is an issue fetching data -->
    <div v-if="error">{{ error }}</div>

    <!-- Display table only if data is loaded and no errors occurred -->
    <div class="p-d-flex p-flex-column p-ai-center p-4">
      <DataTable v-if="!loading && !error" :value="numbers" showGridlines tableStyle="min-width: 400px">
        <Column field="id" header="ID"></Column>
        <Column field="intnum" header="Integer Num"></Column>
        <Column field="doublenum" header="Double Num"></Column>
        <Column field="horizontal_with_step" header="Horizontal Step"></Column>
        <Column field="vertical_with_step" header="Vertical Step"></Column>
        <Column header="Action">
          <template #body="slotProps">
            <Button
                class="m-2 p-2"
                style="background: #eded07; border:1px solid #eded07; border-radius:5px"
                @click="openEditDialog(slotProps.data)"
            >
              Edit
            </Button>
            <Button
                class="m-2 p-2"
                style="background: #e35555; border:1px solid #e35555; border-radius:5px"
                @click="deleteNumber(slotProps.data.id)"
            >
              Delete
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Edit Dialog using PrimeVue Dialog component -->
    <Dialog v-model:visible="showEditDialog" :style="{ width: '30vw', background: 'grey', padding: '12px', border: '1px solid grey' }" header="Edit Number">
      <Form @submit="handleSubmit" v-slot="{ errors }">
        <div class="flex flex-wrap gap-4">
          <div class="flex-column font-bold block mb-2">
            <label for="intnum" class="font-bold">Integer Num</label>
            <Field name="intnum" v-model="editedNumber.intnum" rules="required">
              <InputNumber
                  id="intnum"
                  v-model="editedNumber.intnum"
                  fluid
                  placeholder="Enter integer number"
              />
              <ErrorMessage name="intnum" class="error"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label for="doublenum" class="font-bold">Decimal</label>
            <Field name="doublenum" v-model="editedNumber.doublenum" rules="required">
              <InputNumber
                  id="doublenum"
                  v-model="editedNumber.doublenum"
                  :minFractionDigits="2"
                  fluid
                  locale="en-US"
                  placeholder="Enter decimal value"
              />
              <ErrorMessage name="doublenum" class="error"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label for="horizontal_with_step" class="font-bold">Horizontal with Step</label>
            <Field name="horizontal_with_step" v-model="editedNumber.horizontal_with_step" rules="required">
              <InputNumber
                  id="horizontal_with_step"
                  v-model="editedNumber.horizontal_with_step"
                  :step="0.25"
                  buttonLayout="horizontal"
                  mode="currency"
                  currency="EUR"
                  placeholder="Horizontal Increment"
                  showButtons
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus"/>
                </template>
              </InputNumber>
              <ErrorMessage name="horizontal_with_step" class="error"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label for="vertical_with_step" class="font-bold">Vertical with Step</label>
            <Field name="vertical_with_step" v-model="editedNumber.vertical_with_step" rules="required">
              <InputNumber
                  id="vertical_with_step"
                  v-model="editedNumber.vertical_with_step"
                  :step="1"
                  :min="0"
                  :max="99"
                  buttonLayout="vertical"
                  placeholder="Vertical Increment"
                  showButtons
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus"/>
                </template>
              </InputNumber>
              <ErrorMessage name="vertical_with_step" class="error"/>
            </Field>
          </div>
        </div>

        <div class="flex justify-content-center gap-3 mt-4">
          <Button type="button" label="Cancel" severity="secondary" @click="closeEditDialog"></Button>
          <Button type="submit" label="Update Number"></Button>
        </div>
      </Form>

      <!-- Display success message if update is successful -->
      <div v-if="updateSuccess" class="success-message mt-2">{{ updateSuccess }}</div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { required, numeric } from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';

// Define and register validation rules
defineRule('required', required);

// Real-time validation configuration
configure({ validateOnInput: true });

// Define the interface for the number type
interface NumberData {
  id: number;
  intnum: number;
  doublenum: number;
  horizontal_with_step: number;
  vertical_with_step: number;
}

const numbers = ref<NumberData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showEditDialog = ref(false);
const editedNumber = ref<NumberData | null>(null);
const updateSuccess = ref<string | null>(null);

// Fetch number data when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('/api/numbers');
    numbers.value = response.data.result;
  } catch (err) {
    error.value = 'Failed to load numbers.';
    console.error('Error fetching numbers:', err);
  } finally {
    loading.value = false;
  }
});

// Open the edit dialog
const openEditDialog = (number: NumberData) => {
  editedNumber.value = { ...number };
  showEditDialog.value = true;
};

// Close the edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false;
  editedNumber.value = null;
  updateSuccess.value = null;
};

// Handle form submission
const handleSubmit = async () => {
  if (editedNumber.value) {
    try {
      await axios.put(`/api/numbers/${editedNumber.value.id}`, editedNumber.value);
      numbers.value = numbers.value.map(number =>
          number.id === editedNumber.value!.id ? editedNumber.value! : number
      );
      updateSuccess.value = 'Number updated successfully!';
    } catch (err) {
      error.value = 'Failed to update number.';
      console.error('Error updating number:', err);
    } finally {
      closeEditDialog();
    }
  }
};

// Handle delete number
const deleteNumber = async (id: number) => {
  try {
    await axios.delete(`/api/numbers/${id}`);
    numbers.value = numbers.value.filter(number => number.id !== id);
  } catch (err) {
    error.value = 'Failed to delete number.';
    console.error('Error deleting number:', err);
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 1rem;
  margin-top: 0.5rem;
}
.success-message {
  color: green;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
