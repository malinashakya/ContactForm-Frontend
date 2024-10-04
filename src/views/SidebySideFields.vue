<script setup>
import {configure, defineRule, ErrorMessage, Field, Form} from "vee-validate";
import Button from "primevue/button";
import {integer, min, regex, required} from '@vee-validate/rules';
import {computed} from "vue";

const handleSubmit = () => {
  console.log("Form submitted");
};

// Define rules
defineRule('required', required);
defineRule('min', min);
defineRule('integer', integer);
defineRule('regex', regex);

defineRule('phone', (value) => {
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(value)) {
    return "Contact must be 10 digit number.";
  }
  return true;
});

defineRule('lettersOnly', (value) => {
      const strings = /^[A-Za-z]+$/;
      if (!strings.test(value)) {
        return "Must be letters only";
      }
      return true;
    }
)

defineRule('age', (value) => {
  if (value < 1 || value > 120) {
    return "Age must be between 1 and 120";
  }
  return true;
})
// Customized messages
configure({
  validateOnInput: true,
  generateMessage: (context) => {
    const fieldName = context.field;
    const message = {
      required: `${fieldName} is required.`,
      min: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} should be at least ${context.rule?.params[0]} characters.`,
      integer: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} should be numbers only`
    };
    return message[context.rule?.name] || `Invalid ${fieldName}.`;
  },
});

</script>

<template>
  <Form class="p-fluid grid form-grid" @submit="handleSubmit">

    <!-- Name Field (Column 1) -->
    <div class="col-6 column1 ">
      <label class="label" for="name">Nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</label>
      <Field v-slot="{ field }" name="name" rules="required|min:2|lettersOnly">
        <InputText id="address" class="w-4.5 ml-3" placeholder="Name" v-bind="field"/>
      </Field>
      <div>
        <ErrorMessage class="p-error " name="name"/>
      </div>
    </div>

    <!-- Address Field (Column 2) -->
    <div class="col-6 column2">
      <label class="label" for="address">Addressssssssssssssssssssssssss</label>
      <Field v-slot="{ field }" name="address" rules="required|min:2|lettersOnly">
        <InputText id="address" class="w-4.5 ml-3" placeholder="Address" v-bind="field"/>
      </Field>
      <div>
        <ErrorMessage class="p-error " name="address"/>
      </div>
    </div>

    <!-- Contact Field (New Row) -->
    <div class="col-6 column1">
      <label class="label" for="contact">Contact</label>
      <Field v-slot="{ field }" name="contact" rules="required|phone">
        <InputText id="contact" class="w-4.5 ml-3" placeholder="Contact" v-bind="field"/>
      </Field>
      <div>
        <ErrorMessage class="p-error " name="contact"/>
      </div>
    </div>


    <!-- Age Field (New Row) -->
    <div class="col-6 column2">
      <label class="label" for="age">Age</label>
      <Field v-slot="{ field }" name="age" rules="required|integer|age">
        <InputText id="age" class="w-4.5 ml-3" placeholder="Age" v-bind="field"/>
      </Field>
      <div>
        <ErrorMessage class="p-error " name="age"/>
      </div>
    </div>

    <!-- Submit Button (New Row) -->
    <div class="col-12">
      <div class="form-field">
        <Button label="Submit" type="submit"/>
      </div>
    </div>

  </Form>
</template>

<style scoped>

.p-error {
  color: red;
}
</style>