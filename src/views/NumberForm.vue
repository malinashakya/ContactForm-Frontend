<template>
  <section class="number-form">
    <Form class="number-form" @submit="handleSubmit">
      <div class="card flex flex-wrap gap-4">

        <div class="flex-column font-bold block mb-2">
          <label class="font-bold block mb-2" for="intnum">Integer Only</label>
          <Field v-slot="{ field}" name="intnum" rules="required">
            <InputNumber
                v-model="formData.intnum"
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
          <Field v-slot="{ field, errorMessage }" name="decimal" rules="required">
            <InputNumber
                id="decimal"
                v-model="formData.doublenum"
                :minFractionDigits="2"
                :placeholder="'Enter decimal value'"
                fluid
                inputId="locale-us"
                locale="en-US"
                @blur="field.onBlur"
                @input="field.onInput"
            />
            <ErrorMessage class="error" name="decimal"/>
          </Field>
        </div>

        <div class="flex-column font-bold block mb-2">
          <label class="font-bold block mb-2" for="horizontal-buttons"> Horizontal with Step </label>
          <Field v-slot="{field,errorMessage}" name="horizontal_with_step" rules="required">
            <InputNumber v-model="formData.horizontal_with_step" :step="0.25" buttonLayout="horizontal" currency="EUR"
                         inputId="horizontal-buttons" mode="currency" showButtons
                         @blur="field.onBlur"
                         @input="field.onInput"
            placeholder="Horizontal Increment">
              <template #incrementbuttonicon>
                <span class="pi pi-plus"/>
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus"/>
              </template>
            </InputNumber>
          </Field>
          <ErrorMessage class="error" name="horizontal_with_step"/>
        </div>

        <div class="flex-column font-bold block mb-2">
          <label class="font-bold block mb-2" for="vertical-buttons"> Vertical with Step </label>
          <Field v-slot="{field,errorMessage}" name="vertical_with_step" rules="required">
            <InputNumber v-model="formData.vertical_with_step" :max="99" :min="0" buttonLayout="vertical" showButtons
                         style="width: 3rem" @blur="field.onBlur"
                         @input="field.onInput"
                         placeholder="Horizontal Increment">
              <template #incrementbuttonicon>
                <span class="pi pi-plus"/>
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus"/>
              </template>
            </InputNumber>
          </Field>
          <ErrorMessage class="error" name="vertical_with_step"/>
        </div>
      </div>

      <Button type="submit">Send Message</Button>
    </Form>
  </section>
</template>

<script lang="js" setup>
import {configure, defineRule, ErrorMessage, Field, Form} from "vee-validate";
import {reactive} from 'vue';
import InputNumber from 'primevue/inputnumber';
import {integer, required} from '@vee-validate/rules'
import Button from "primevue/button";
import axios from "axios";

// Define rules
const integerOnlyRules = 'required|integer';
const decimalRules = 'required|decimal';

// Register validation rules
defineRule('required', required)
defineRule('integer', integer)


// Custom decimal rule for validation
defineRule("decimal", value => {
  if (!value) return true;
  const decimalRegex = /^\d+(\.\d+)?$/;
  return decimalRegex.test(value) || "The field must be a decimal.";
});

// Form Data
const formData = reactive({
  intnum: null,
  doublenum: null,
  horizontal_with_step: null,
  vertical_with_step: null,
});

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/numbers', formData);
    console.log('Response:', response.data);

    // Clear form data after successful submission
    Object.keys(formData).forEach(key => (formData[key] = null));
  } catch (error) {
    console.error('Error sending message:', error);
    alert('An error occurred while sending your message. Please try again.');
  }
}

//Real-time validation
configure({
  validateOnInput: true
});

</script>
<style>
.error {
  color: red;
}
</style>