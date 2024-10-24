<template>
  <Form @submit="handleSubmit">
    <!-- Row 1: Name and Address -->
    <div class="form-grid1">
      <!-- Name Field -->
      <div class="field-group">
        <label class="label" for="name">Stock Valuation Method* </label>
        <div class="fields">
          <Field v-slot="{ field }" name="name" rules="required|min:2|lettersOnly">
            <InputText id="name" class="input-field" placeholder="Name" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="name"/>
        </div>
      </div>


      <!-- Address Field -->
      <div class="field-group">
        <label class="label" for="address">Enable Price Daily Change</label>
        <div class="fields">
          <Field v-slot="{ field }" name="address" rules="required|min:2">
            <InputText id="address" class="input-field" placeholder="Address" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="address"/>
        </div>
      </div>

      <div class="field-group">
        <label class="label" for="landline">Opening Stock Quantity</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>

    </div>

    <!-- Row 2: Contact and Age -->
    <div class="form-grid1">
      <!-- Contact Field -->
      <div class="field-group">
        <label class="label" for="contact">Inc. VAT Selling Price
        </label>
        <div class="fields">
          <Field v-slot="{ field }" name="contact" rules="required|phone">
            <InputText id="contact" class="input-field" placeholder="Contact" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="contact"/>
        </div>
      </div>


      <!-- Age Field -->
      <div class="field-group">
        <label class="label" for="age">Full Description</label>
        <div class="fields">
          <Field v-slot="{ field }" name="age" rules="required|integer|age">
            <InputText id="age" class="input-field" placeholder="Age" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="age"/>
        </div>
      </div>


      <!-- DOB Field -->
      <div class="field-group">
        <label class="label" for="dob">DOB</label>
        <div class="fields">
          <Field v-slot="{ field }" name="age" rules="required|integer|age">
            <InputText id="dob" class="input-field" placeholder="DOB" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="age"/>
        </div>
      </div>



    </div>
    <!-- Row 1: Name and Address -->
    <div class="form-grid1">
      <!-- Name Field -->
      <div class="field-group">
        <label class="label" for="name">Name </label>
        <div class="fields">
          <Field v-slot="{ field }" name="name" rules="required|min:2|lettersOnly">
            <InputText id="name" class="input-field" placeholder="Name" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="name"/>
        </div>
      </div>

      <!-- Address Field -->
      <div class="field-group">
        <label class="label" for="address">Address</label>
        <div class="fields">
          <Field v-slot="{ field }" name="address" rules="required|min:2">
            <InputText id="address" class="input-field" placeholder="Address" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="address"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>


      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
      <div class="field-group">
        <label class="label" for="landline">Landline</label>
        <div  class="fields">
          <Field v-slot="{ field }" name="landline" rules="required">
            <InputText id="landline" class="input-field" placeholder="Landline" v-bind="field"/>
          </Field>
          <ErrorMessage class="p-error" name="landline"/>
        </div>
      </div>
    </div>


    <!-- Submit Button -->
    <div class="form-row">
      <Button label="Submit" type="submit"/>
    </div>
  </Form>
</template>

<script setup>
import {defineRule, Field, Form, ErrorMessage} from "vee-validate";
import {required, min, integer} from "@vee-validate/rules";
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
.form-grid1 {
  display: grid;
  grid-template-columns:  repeat(3, minmax(20px, 1fr));
  align-items: center;
  gap: 1rem 2rem;
  margin: 1rem 1rem;
}

.field-group {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.1rem;
  margin-bottom: 1rem;

}

.input-field {
  width: 100%;
}

.label {
  font-size: 12px;
  width:140px;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
</style>