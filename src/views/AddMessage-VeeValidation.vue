<template>
  <section class="contact">
    <!-- Greeting Section -->
    <div class="greet">
      <Button class="view-contact-button" @click="navigateToViewContact">
        View Contact
      </Button>
      <h2>Contact Me</h2>
      <h3>Let's Greet and Meet.</h3>
    </div>

    <!-- Contact Form Section -->
    <Form class="contact-form" @submit="handleSubmit">
      <div class="form-group p-mb-4">
        <label for="name">Name<span class="required">*</span></label>
        <Field
            id="name"
            v-model="formData.name"
            as="input"
            name="name"
            placeholder="Your Name"
            rules="required|min:3"
        />
        <ErrorMessage class="error" name="name"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="email">Email<span class="required">*</span></label>
        <Field
            id="email"
            v-model="formData.email"
            as="input"
            name="email"
            placeholder="Your Email"
            rules="required|email"
            type="email"
        />
        <ErrorMessage class="error" name="email"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="contact">Contact<span class="required">*</span></label>
        <Field
            id="contact"
            v-model="formData.contact"
            as="input"
            name="contact"
            placeholder="Your Contact"
            rules="required|min:10"
        />
        <ErrorMessage class="error" name="contact"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="address">Address<span class="required">*</span></label>
        <Field
            id="address"
            v-model="formData.address"
            as="input"
            name="address"
            placeholder="Your Address"
            rules="required"
        />
        <ErrorMessage class="error" name="address"/>
      </div>

      <div class="form-group p-mb-4">
        <label for="message">Message<span class="required">*</span></label>
        <Field
            id="message"
            v-model="formData.message"
            as="textarea"
            name="message"
            placeholder="Your Message"
            rows="4"
            rules="required|min:10"
        />
        <ErrorMessage class="error" name="message"/>
      </div>

      <Button type="submit">Send Message</Button>
    </Form>
  </section>
</template>

<script lang="ts" setup>
import {reactive, watch, toRaw} from 'vue'
import {Form, Field, ErrorMessage, defineRule, configure, useField} from 'vee-validate'
import {required, email, min} from '@vee-validate/rules'
import axios from 'axios'
import {useRouter} from 'vue-router'
import Button from 'primevue/button'

// Register validation rules
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

// Configure VeeValidate if needed
configure({
  // Additional configuration can be added here if necessary
})

// Reactive form data
const formData = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
})

// Reactive errors object
const formErrors = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
})

// Watchers for validation
watch(() => formData.name, async () => await validateField('name'))
watch(() => formData.email, async () => await validateField('email'))
watch(() => formData.contact, async () => await validateField('contact'))
watch(() => formData.address, async () => await validateField('address'))
watch(() => formData.message, async () => await validateField('message'))

const validateField = async (field: keyof typeof formData) => {
  try {
    const fieldValue = formData[field]
    const fieldRules = {
      name: 'required|min:3',
      email: 'required|email',
      contact: 'required|min:10',
      address: 'required',
      message: 'required|min:10'
    }

    const rule = fieldRules[field]
    const {meta} = useField(field, rule)
    const isValid = await meta.validate(fieldValue)

    if (isValid) {
      formErrors[field] = ''
    } else {
      formErrors[field] = meta.errors[0]
    }
  } catch (error) {
    console.error(`Error validating field ${field}:`, error)
  }
}

const validateForm = async () => {
  try {
    // Reset the form errors before validation
    Object.keys(formErrors).forEach(key => (formErrors[key] = ''))

    // Validate each field
    for (const key of Object.keys(formData)) {
      await validateField(key as keyof typeof formData)
    }

    // Check if there are any validation errors
    return !Object.values(formErrors).some(error => error !== '')
  } catch (error) {
    console.error('Error validating form:', error)
    return false
  }
}

// Handle form submission
const handleSubmit = async () => {
  // Validate the form before making the request
  const isValid = await validateForm()
  if (!isValid) {
    return // Stop submission if validation fails
  }

  try {
    const response = await axios.post('/api/contacts', toRaw(formData))
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
  router.push({name: 'viewcontact'})
}
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

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ecf0f1;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background: whitesmoke;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid #1abc9c;
}

button,
.p-button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button,
.p-button:hover {
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
    font-size: 1.875rem; /* Adjusted for responsiveness */
  }
}

@media (min-width: 1380px) {
  .contact {
    height: 100vh;
  }
}
</style>
