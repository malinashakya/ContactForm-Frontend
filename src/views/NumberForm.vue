<template>
  <section class="number-form">
    <Form class="number-form" @submit="handleSubmit">
      <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="integeronly"> Integer Only </label>
          <InputNumber v-model="formData.intnum" fluid inputId="integeronly"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="withoutgrouping"> Without Grouping </label>
          <InputNumber v-model="formData.nogroupintnum" :useGrouping="false" fluid inputId="withoutgrouping"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="minmaxfraction"> Min-Max Fraction Digits </label>
          <InputNumber v-model="formData.minmaxfractdigit" :maxFractionDigits="5" :minFractionDigits="2" fluid inputId="minmaxfraction"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="minmax"> Min-Max Boundaries </label>
          <InputNumber v-model="formData.minmaxboundary" :max="100" :min="0" fluid inputId="minmax"/>
        </div>
      </div>

      <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="decimaldigits"> Decimal Digits </label>
          <InputNumber v-model="formData.doublenum" :minFractionDigits="2" fluid inputId="decimaldigits"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="locale-user"> User Locale </label>
          <InputNumber v-model="formData.user_locale" :minFractionDigits="2" fluid inputId="locale-user"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="locale-us"> United States Locale </label>
          <InputNumber v-model="formData.us_locale" :minFractionDigits="2" fluid inputId="locale-us" locale="en-US"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="locale-german"> German Locale </label>
          <InputNumber v-model="formData.german_locale" :minFractionDigits="2" fluid inputId="locale-german" locale="de-DE"/>
        </div>
      </div>

      <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="locale-indian"> Indian Locale </label>
          <InputNumber v-model="formData.indian_locale" :minFractionDigits="2" fluid inputId="locale-indian" locale="en-IN"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="currency-us"> United States </label>
          <InputNumber v-model="formData.currency" currency="USD" fluid inputId="currency-us" locale="en-US" mode="currency"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="mile"> Mile </label>
          <InputNumber v-model="formData.prefiix" fluid inputId="mile" suffix=" mi"/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="percent"> Percent </label>
          <InputNumber v-model="formData.suffix" fluid inputId="percent" prefix="%"/>
        </div>
      </div>

      <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="stacked-buttons"> Stacked </label>
          <InputNumber v-model="formData.stacked" currency="USD" fluid inputId="stacked-buttons" mode="currency" showButtons/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="minmax-buttons"> Min-Max Boundaries </label>
          <InputNumber v-model="formData.minmax" :max="100" :min="0" fluid inputId="minmax-buttons" mode="decimal" showButtons/>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="horizontal-buttons"> Horizontal with Step </label>
          <InputNumber v-model="formData.horizontal_with_step" :step="0.25" buttonLayout="horizontal" currency="EUR" fluid inputId="horizontal-buttons" mode="currency" showButtons>
            <template #incrementbuttonicon>
              <span class="pi pi-plus"/>
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus"/>
            </template>
          </InputNumber>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="vertical-buttons"> Vertical with Step </label>
          <InputNumber v-model="formData.vertical_with_step" :max="99" :min="0" buttonLayout="vertical" showButtons style="width: 3rem">
            <template #incrementbuttonicon>
              <span class="pi pi-plus"/>
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus"/>
            </template>
          </InputNumber>
        </div>
      </div>

      <Button type="submit">Send Message</Button>
    </Form>
  </section>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import { reactive } from 'vue';
import InputNumber from 'primevue/inputnumber';
import Button from "primevue/button";
import axios from "axios";

// Form Data
const formData = reactive({
  intnum: null,
  nogroupintnum: null,
  minmaxfractdigit: null,
  minmaxboundary: null,
  doublenum: null,
  user_locale: null,
  us_locale: null,
  german_locale: null,
  indian_locale: null,
  currency: null,
  prefiix: null,
  suffix: null,
  stacked: null,
  minmax: null,
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
</script>
