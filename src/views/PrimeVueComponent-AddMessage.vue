<template>
  <section class="contact">
    <div class="greet">
      <Button class="view-contact-button" @click="navigateToViewContact">
        View Contact
      </Button>
      <h2>Contact Me</h2>
      <h3>Let's Greet and Meet.</h3>
    </div>

    <Form class="contact-form" @submit="handleSubmit">
      <div class="form-group p-mb-4">
        <label for="name">Name<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" name="name" rules="required|min:2|lettersOnly">
          <InputText v-model="formData.name" placeholder="Your Name" v-bind="field"/>
        </Field>
        <ErrorMessage class="error" name="name"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="contactVia">Contact Via<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" name="contactVia" rules="required">
          <Select
              id="contactVia"
              v-model="formData.contactVia"
              :options="contactViaOptions"
              placeholder="Select Contact Method"
              v-bind="field"
          />
        </Field>
        <ErrorMessage class="error" name="contactVia"/>
      </div>


      <div class="form-group p-mb-4">
        <label for="email">Email<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" :rules="emailRules" name="email">
          <InputText v-model="formData.email" placeholder="Your Email" type="email" v-bind="field"/>
        </Field>
        <ErrorMessage class="error" name="email"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="contact">Contact<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" :rules="contactRules" name="contact">
          <InputText v-model="formData.contact" placeholder="Your Contact" v-bind="field"/>
        </Field>
        <ErrorMessage class="error" name="contact"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="address">Address<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" name="address" rules="required|min:3">
          <InputText v-model="formData.address" placeholder="Your Address" v-bind="field"/>
        </Field>
        <ErrorMessage class="error" name="address"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="message">Message<span class="required">*</span></label>
        <Field v-slot="{ field, errorMessage }" name="message" rules="required|min:10">
          <Textarea v-model="formData.message" placeholder="Your Message" rows="4" v-bind="field"/>
        </Field>
        <ErrorMessage class="error" name="message"/>
      </div>

      <Button type="submit">Send Message</Button>
    </Form>
  </section>
</template>

<script lang="ts" setup>
import {onMounted, reactive, computed} from 'vue'
import {Form, Field, ErrorMessage, defineRule, configure} from 'vee-validate'
import {required, email, min} from '@vee-validate/rules'
import axios from 'axios'
import {useRouter} from 'vue-router'
import Button from 'primevue/button'
import Textarea from "primevue/textarea";
import Select from "primevue/select";

//THis becomes active only if contactVia is Email, i.e. Email's validation is active
const emailRules = computed(() => {
  return formData.contactVia === 'Email' ? 'required|email' : '';
});

//THis becomes active only if contactVia is Phone, i.e. Contact's validation is active
const contactRules = computed(() => {
  return formData.contactVia === 'Phone' ? 'required|exactLength:10' : '';
});

// Custom name rule to check for letters only (no numbers or special characters)
const lettersOnly = (value: string) => {
  const nameRegex = /^[a-zA-Z\s]+$/
  return nameRegex.test(value) || 'Name should contain only letters.'
}

// Custom contact rule to check for exactly 10 digits
const exactLength = (value: string, [length]: [number]) => {
  const isNumeric = /^[0-9]+$/.test(value); // Ensure only digits
  if (!isNumeric) return 'Contact should contain only numbers.';
  return value.length == length || `Contact should be exactly ${length} digits.`;
};

// Register validation rules
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('lettersOnly', lettersOnly)
// Register custom rule for Contact
defineRule('exactLength', (value: string, [length]: [number]) => {
  const isNumeric = /^[0-9]+$/.test(value); // Ensure only digits
  return isNumeric && value.length == length || `Contact should be exactly ${length} digits.`;
});

// Configure VeeValidate for customized messages
configure({
  validateOnInput: true, // Enables real-time validation
  generateMessage: (context) => {
    const fieldName = context.field
    const messages = {
      required: `${fieldName} is required.`,
      min: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} should be at least ${context.rule?.params[0]} characters.`,
      email: 'Email must be valid and contain "@" and "."',
      lettersOnly: 'Name should contain only letters.',
      exactLength: 'Contact should be exactly 10 digits long.'
    }
    return messages[context.rule?.name] || `Invalid ${fieldName}.`
  }
})

// Reactive form data
const formData = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
  contactVia: '',
})

const contactViaOptions = reactive<string[]>([]);

//To fetch data from the backend
const fetchContactViaOptions = async () => {
  try {
    const response = await axios.get('/api/contacts/contactvia')
    contactViaOptions.push(...response.data)
  } catch (error) {
    console.error('Error fetching data of contact via options:', error);
  }
}


// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/contacts', formData)
    console.log('Response:', response.data)
    alert(`Thank you, ${formData.name}! Your message has been sent.`)

    // Clear form data after successful submission
    Object.keys(formData).forEach(key => (formData[key] = ''))
  } catch (error) {
    console.error('Error sending message:', error)
    alert('An error occurred while sending your message. Please try again.')
  }
}

const router = useRouter()

const navigateToViewContact = () => {
  router.push({name: 'primecontactview'})
}

onMounted(() => {
  fetchContactViaOptions()
})
</script>

<style scoped>
.contact {
  padding: 2rem;
  background: #4861a1;
  color: white;
  text-align: center;
}

.contact h2 {
  margin-top: 0;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.greet {
  margin-bottom: 20px;
  line-height: 1.5;
}

.contact-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #031b34;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid #1abc9c;
}

button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: dodgerblue;
}

.text-area {
  height: 100px;
}

.error {
  color: rgba(255, 0, 0, 0.85);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.required {
  padding-left: 2px;
  color: rgba(255, 0, 0, 0.85);
}

/* Responsive styles */
@media (min-width: 2560px) {
  .contact h2 {
    font-size: 4.5rem;
  }

  .contact h3 {
    font-size: 3rem;
  }

  .form-group label {
    font-size: 2rem;
  }

  .form-group input,
  .form-group textarea {
    font-size: 2rem;
    line-height: 2;
  }

  .contact-form {
    max-width: 800px;
  }

  button,
  .p-button {
    font-size: 1.875rem;
  }
}

@media (min-width: 1380px) {
  .contact {
    height: 100vh;
  }
}
</style>