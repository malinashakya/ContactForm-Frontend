<template>
  <div>
    <h2>Number Data</h2>
    <div v-if="loading">Loading....</div>
    <div v-if="error">{{ error }}</div>
    <div class="p-d-flex p-flex-column p-ai-center p-4">
      <DataTable
          v-if="!loading && !error"
          :value="numbers"
          show-gridlines
          table-style="min-width:400px"
      >
        <Column class="p-3" field="id" header="ID"></Column>
        <Column class="p-3" field="intnum" header="Integer Num"></Column>
        <Column class="p-3" field="doublenum" header="Double Num"></Column>
        <Column class="p-3" field="horizontal_with_step" header="Horizontal Step"></Column>
        <Column class="p-3" field="vertical_with_step" header="Vertical Step"></Column>
        <Column class="p-3" header="Action">
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

    <!-- Edit Dialog Box -->
    <Dialog
        v-model:visible="showEditDialog"
        :style="{ width: '30vw', background: 'grey', padding: '12px', border: '1px solid grey' }"
        header="Edit Number"

    >
      <Form v-if="editedNumber" class="number-form" @submit="handleSubmit">
        <div class="card flex flex-wrap gap-4">
          <div class="flex-column font-bold block mb-2">
            <label class="font-bold block mb-2" for="intnum">Integer Only</label>
            <Field v-slot="{ field }" name="intnum" rules="required">
              <InputNumber
                  v-model="editedNumber.intnum"
                  fluid
                  placeholder="Enter Integer number"
                  @blur="field.onBlur"
                  @input="field.onInput"
              />
              <ErrorMessage class="error" name="intnum"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label class="font-bold block mb-2" for="decimal">Decimal</label>
            <Field v-slot="{ field }" name="doublenum" rules="required">
              <InputNumber
                  v-model="editedNumber.doublenum"
                  :minFractionDigits="2"
                  fluid
                  inputId="locale-us"
                  locale="en-US"
                  placeholder="Enter decimal value"
                  @blur="field.onBlur"
                  @input="field.onInput"
              />
              <ErrorMessage class="error" name="doublenum"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label class="font-bold block mb-2" for="horizontal-buttons">Horizontal with Step</label>
            <Field v-slot="{ field }" name="horizontal_with_step" rules="required">
              <InputNumber
                  v-model="editedNumber.horizontal_with_step"
                  :step="0.25"
                  buttonLayout="horizontal"
                  currency="EUR"
                  inputId="horizontal-buttons"
                  mode="currency"
                  placeholder="Horizontal Increment"
                  showButtons
                  @blur="field.onBlur"
                  @input="field.onInput"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus"/>
                </template>
              </InputNumber>
              <ErrorMessage class="error" name="horizontal_with_step"/>
            </Field>
          </div>

          <div class="flex-column font-bold block mb-2">
            <label class="font-bold block mb-2" for="vertical-buttons">Vertical with Step</label>
            <Field v-slot="{ field }" name="vertical_with_step" rules="required">
              <InputNumber
                  v-model="editedNumber.vertical_with_step"
                  :max="99"
                  :min="0"
                  buttonLayout="vertical"
                  placeholder="Vertical Increment"
                  showButtons
                  style="width: 3rem"
                  @blur="field.onBlur"
                  @input="field.onInput"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus"/>
                </template>
              </InputNumber>
              <ErrorMessage class="error" name="vertical_with_step"/>
            </Field>
          </div>
        </div>

        <Button type="submit">Update Number</Button>
      </Form>
      <div v-if="updateSuccess" class="success-message mt-2">{{ updateSuccess }}</div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {configure, defineRule, ErrorMessage, Field, Form} from "vee-validate";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import {ref, onMounted} from "vue";
import axios from "axios";
import {required} from '@vee-validate/rules';
import Dialog from 'primevue/dialog';

// Register validation rules
defineRule('required', required)

//Real-time validation
configure({
  validateOnInput: true
});

// Define the interface for the number type
interface NumberData {
  id: number;
  intnum: number;
  doublenum: number;
  horizontal_with_step: number;
  vertical_with_step: number;
}

configure({
  validateOnInput: true
});

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
  editedNumber.value = {...number};
  showEditDialog.value = true;
};

// Close the edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false;
  editedNumber.value = null;
  updateSuccess.value = null;
};

// Update number details
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
