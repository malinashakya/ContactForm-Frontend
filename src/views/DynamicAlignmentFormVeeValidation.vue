<script setup>
import { configure, defineRule, ErrorMessage, Field, Form } from "vee-validate";
import Button from "primevue/button";
import {integer, min, regex, required} from '@vee-validate/rules';
import {computed} from "vue";

const handleSubmit = () => {
  console.log("Form submitted");
};

// Define rules
defineRule('required', required);
defineRule('min',min);
defineRule('integer',integer);
defineRule('regex',regex);

defineRule('phone',(value)=>{
  const phonePattern=/^\d{10}$/;
  if(!phonePattern.test(value)){
    return "Contact must be 10 digit number.";
  }
  return true;
});

defineRule('lettersOnly',(value)=>{
  const strings=/^[A-Za-z]+$/;
  if(!strings.test(value)){
    return "Must be letters only";
  }
  return true;
    }
)

defineRule('age',(value)=>{
  if(value<1 || value>120)
  {
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
            integer:`${fieldName.charAt(0).toUpperCase()+fieldName.slice(1)} should be numbers only`
    };
    return message[context.rule?.name] || `Invalid ${fieldName}.`;
  },
});

</script>

<template>
  <Form class="form-grid" @submit="handleSubmit">

    <!-- Name Field -->
    <div class="form-row">
      <label for="name" class="label">Nammmmmmmmmmmmmmmmeeeeeeeeeee</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="name" rules="required|min:2|lettersOnly">
          <InputText id="name" class="w-4.5" placeholder="Name" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="name"/>
      </div>
    </div>

    <!-- Address Field -->
    <div class="form-row">
      <label for="address" class="label">Address</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="address" rules="required|min:2|lettersOnly">
          <InputText id="address" class="w-4.5" placeholder="Address" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="address"/>
      </div>
    </div>

    <!-- Contact Field -->
    <div class="form-row">
      <label for="contact" class="label">Contact</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="contact" rules="required|phone">
          <InputText id="contact" class="w-4.5" placeholder="Contact" v-bind="field"/>
        </Field>
        <ErrorMessage class="p-error ml-3" name="contact"/>
      </div>
    </div>

    <!-- Age Field -->
    <div class="form-row">
      <label for="age" class="label">Age</label>
      <div class="form-field">
        <Field v-slot="{ field }" name="age" rules="required|integer|age">
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

.form-grid {
  display: grid;
  grid-template-columns: auto 1fr; /* Labels take natural width, inputs take remaining space */
  gap: 10px;
}

.form-row {
  display: contents;
}

.p-error {
  color: red;
}

</style>
