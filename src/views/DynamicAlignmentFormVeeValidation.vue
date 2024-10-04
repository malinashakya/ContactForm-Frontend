<script setup>
import { configure, defineRule, ErrorMessage, Field, Form } from "vee-validate";
import Button from "primevue/button";
import { required } from '@vee-validate/rules';

const handleSubmit = () => {
  console.log("Form submitted");
};

// Define rules
defineRule('required', required);

// Customized messages
configure({
  validateOnInput: true,
  generateMessage: (context) => {
    const fieldName = context.field;
    const message = {
      required: `${fieldName} is required.`,
    };
    return message[context.rule?.name] || `Invalid ${fieldName}.`;
  },
});
</script>

<template>
  <Form class="form-grid " @submit="handleSubmit">

    <!-- Name Field -->
    <div class="form-row d-contents">
      <label for="name" class="label">Nameeeeeffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeee</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="name" rules="required">
          <InputText id="name" class="w-4.5" placeholder="Name" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3 text-primary" name="name"/>
      </div>
    </div>

    <!-- Address Field -->
    <div class="form-row">
      <label for="address" class="label">Address</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="address" rules="required">
          <InputText id="address" class="w-4.5" placeholder="Address" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="address"/>
      </div>
    </div>

    <!-- Contact Field -->
    <div class="form-row">
      <label for="contact" class="label">Contact</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="contact" rules="required">
          <InputText id="contact" class="w-4.5" placeholder="Contact" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="contact"/>
      </div>
    </div>

    <!-- Age Field -->
    <div class="form-row">
      <label for="age" class="label">Age</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="age" rules="required">
          <InputText id="age"  class="w-4.5" placeholder="Age" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="age"/>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="form-row">
      <div class="form-field">
        <Button label="Submit" type="submit"/>
      </div>
    </div>

  </Form>
</template>

<style scoped>
/* Form grid layout */
.form-grid {
  display: grid;
  grid-template-columns: auto 1fr; /* Labels take natural width, inputs take remaining space */
  gap: 10px;
}

.form-row {
  display: contents; /* Use contents to keep the rows aligned */
}

.p-error {
  color: red;
}

</style>
