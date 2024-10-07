<template>
  <Form @submit="handleSubmit">
    <!-- Row 1: Name and Address -->
    <div class="form-grid">
      <!-- Name Field -->
      <div class="field-group">
        <label class="label" for="name">Nameeeeeeeeeeeeeeeerrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyy</label>
        <div>
          <Field v-slot="{ field }" name="name" rules="required|min:2|lettersOnly">
            <InputText id="name" class="input-field" placeholder="Name" v-bind="field" />
          </Field>
          <div>
            <ErrorMessage class="p-error" name="name" />
          </div>
        </div>
      </div>

      <!-- Address Field -->
      <div class="field-group">
        <label class="label" for="address">Addresyyyyyyyyyyyystttttttttttttttttt</label>
        <div>
          <Field v-slot="{ field }" name="address" rules="required|min:2">
            <InputText id="address" class="input-field" placeholder="Address" v-bind="field" />
          </Field>
          <div>
            <ErrorMessage class="p-error" name="address" />
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: Contact and Age -->
    <div class="form-grid">
      <!-- Contact Field -->
      <div class="field-group">
        <label class="label" for="contact">Contactttttttttttt</label>
        <div>
          <Field v-slot="{ field }" name="contact" rules="required|phone">
            <InputText id="contact" class="input-field" placeholder="Contact" v-bind="field" />
          </Field>
          <div>
            <ErrorMessage class="p-error" name="contact" />
          </div>
        </div>
      </div>

      <!-- Age Field -->
      <div class="field-group">
        <label class="label" for="age">Age</label>
        <div>
          <Field v-slot="{ field }" name="age" rules="required|integer|age">
            <InputText id="age" class="input-field" placeholder="Age" v-bind="field" />
          </Field>
          <div>
            <ErrorMessage class="p-error" name="age" />
          </div>
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
  grid-template-columns: minmax(150px, 1fr) 1fr minmax(120px, 150px) 1fr;
  margin-bottom: 1rem;
}

.field-group {
  display: contents;
}

.label {
  word-break: break-all;
  overflow-wrap: break-word;
}

.p-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

</style>
