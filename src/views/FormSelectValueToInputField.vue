<template>
  <form @submit.prevent="handleSubmit">
    <label for="account">Select Account</label>
    <select id="account" v-model="formData.account" class="account-select" @change="updateName">
      <option value="">Select Account</option>
      <option v-for="option in customers" :key="option.id" :value="option.id">
        {{ option.firstname }} {{ option.lastname }}
      </option>
    </select>

    <label for="name">Name</label>
    <InputText id="name" v-model="formData.name" class="name"/>
    <div v-if="formErrors.name" class="error">{{ formErrors.name }}</div>

    <Button type="submit">Send Message</Button>
  </form>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {ref, reactive, onMounted} from 'vue';
import * as yup from 'yup';
import axios from 'axios';

const error = ref(null);
const formData = reactive({
  name: '',
  account: ''
});
const customers = ref([])

const formErrors = reactive({
  name: ''
});

// Yup schema for form validation
const schema = yup.object().shape({
  name: yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long')
});

// Update name field based on account selection
const updateName = () => {
  const selectedCustomer = customers.value.find(customer => customer.id === formData.account);
  formData.name = selectedCustomer ? `${selectedCustomer.firstname} ${selectedCustomer.lastname}` : '';
};

// Form submission handler
const handleSubmit = async () => {
  try {
    await schema.validate(formData, {abortEarly: false});
    // Clear previous errors if the validation is successful
    Object.keys(formErrors).forEach(key => {
      formErrors[key] = '';
    });
    alert('Form submitted successfully!');
  } catch (error) {
    // Show validation errors
    error.inner.forEach((validationError) => {
      formErrors[validationError.path] = validationError.message;
    });
  }
};

// Parsing function for customer data
function parseCustomers(dataString) {
  return dataString
      .substring(1, dataString.length - 1)
      .split('}, Customer{')
      .map(entry => {
        const parts = entry
            .replace(/[{}]/g, '')
            .split(', ');
        const customer = {};
        parts.forEach(part => {
          const [key, value] = part.split('=');
          if (key && value) customer[key.trim()] = value.trim();
        });
        return customer;
      });
}

// Fetch customer data from the API
const fetchCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/BMS-1.0-SNAPSHOT/api/customers');
    if (response.data.success === 'true') {
      const resultStr = response.data.result;
      customers.value = parseCustomers(resultStr);
    } else {
      error.value = "Error retrieving customers: " + response.data.message;
    }
  } catch (err) {
    error.value = "API request failed: " + err.message;
  }
}

// Fetch customers when the component is mounted
onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
}
</style>
