<template>
  <Form @submit="handleSubmit">
    <!-- Row 1: Name and Address -->
    <div class="form-grid">
      <!-- Name Field -->
      <div class="field-group">
        <label for="name" class="label">Name</label>
        <div>
          <Field name="name" rules="required|min:2|lettersOnly" v-slot="{ field }">
            <InputText id="name" class="input-field" v-bind="field" placeholder="Name" />
          </Field>
          <ErrorMessage name="name" class="p-error" />
        </div>
      </div>

      <!-- Address Field -->
      <div class="field-group">
        <label for="address" class="label">Address</label>
        <div>
          <Field name="address" rules="required|min:2" v-slot="{ field }">
            <InputText id="address" class="input-field" v-bind="field" placeholder="Address" />
          </Field>
          <ErrorMessage name="address" class="p-error" />
        </div>
      </div>
    </div>

    <!-- Row 2: Contact and Age -->
    <div class="form-grid">
      <!-- Contact Field -->
      <div class="field-group">
        <label for="contact" class="label">Contact</label>
        <div>
          <Field name="contact" rules="required|phone" v-slot="{ field }">
            <InputText id="contact" class="input-field" v-bind="field" placeholder="Contact" />
          </Field>
          <ErrorMessage name="contact" class="p-error" />
        </div>
      </div>

      <!-- Age Field -->
      <div class="field-group">
        <label for="age" class="label">Age</label>
        <div>
          <Field name="age" rules="required|integer|age" v-slot="{ field }">
            <InputText id="age" class="input-field" v-bind="field" placeholder="Age" />
          </Field>
          <ErrorMessage name="age" class="p-error" />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="form-row">
      <Button label="Submit" type="submit" />
    </div>
  </Form>
</template>

<script setup>
import { defineRule, Field, Form, ErrorMessage } from "vee-validate";
import { required, min, integer } from "@vee-validate/rules";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

// Define validation rules
defineRule("required", required);
defineRule("min", min);
defineRule("integer", integer);
defineRule("lettersOnly", (value) => {
  return /^[A-Za-z]+$/.test(value) || "Only letters are allowed";
});
defineRule("phone", (value) => {
  return /^\d{10}$/.test(value) || "Must be a valid 10-digit phone number";
});

const handleSubmit = (values) => {
  console.log("Form submitted with:", values);
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 150px 1fr 150px 1fr; /* Two label and input pairs side by side */
  column-gap: 1rem; /* Space between columns */
  row-gap: 1rem; /* Space between rows */
  margin-bottom: 1rem;
}

.field-group {
  display: contents;
}

.input-field {
  width: 100%;
}

.label {
  justify-self: start; /* Align label to start */
}

.p-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
