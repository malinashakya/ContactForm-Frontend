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
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group p-mb-4">
        <label class="p-label" for="name">Name<span class="required">*</span></label>
        <InputText
            id="name"
            v-model="formData.name"
            class="p-inputtext p-component custom-input"
            placeholder="Your Name"
            @input="validateField('name')"
        />
        <div v-if="formErrors.name" class="error">{{ formErrors.name }}</div>
      </div>

      <div class="form-group p-mb-4">
        <label for="contactVia">Contact Via<span class="required">*</span></label>
        <select
            id="contactVia"
            v-model="formData.contactVia"
            class="custom-select"
            @change="validateField('contactVia')"
        >
          <option value="">Select...</option>
          <option v-for="option in contactViaOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <div v-if="formErrors.contactVia" class="error">{{ formErrors.contactVia }}</div>
      </div>

      <div class="form-group p-mb-4">
        <label for="email">Email<span class="required">*</span></label>
        <InputText
            id="email"
            v-model="formData.email"
            class="p-inputtext p-component custom-input"
            placeholder="Your Email"
            type="email"
            @input="validateField('email')"
        />
        <div v-if="formErrors.email" class="error">{{ formErrors.email }}</div>
      </div>

      <div class="form-group p-mb-4">
        <label for="contact">Contact<span class="required">*</span></label>
        <InputText
            id="contact"
            v-model="formData.contact"
            class="p-inputtext p-component custom-input"
            placeholder="Your Contact"
            type="text"
            @input="validateField('contact')"
        />
        <div v-if="formErrors.contact" class="error">{{ formErrors.contact }}</div>
      </div>

      <div class="form-group p-mb-4">
        <label for="address">Address<span class="required">*</span></label>
        <InputText
            id="address"
            v-model="formData.address"
            class="p-inputtext p-component custom-input"
            placeholder="Your Address"
            type="text"
            @input="validateField('address')"
        />
        <div v-if="formErrors.address" class="error">{{ formErrors.address }}</div>
      </div>

      <div class="form-group p-mb-4">
        <label for="message">Message<span class="required">*</span></label>
        <InputText
            id="message"
            v-model="formData.message"
            class="p-inputtext p-component custom-input text-area"
            placeholder="Your Message"
            @input="validateField('message')"
        />
        <div v-if="formErrors.message" class="error">{{ formErrors.message }}</div>
      </div>

      <Button type="submit">Send Message</Button>
    </form>
  </section>
</template>


<script lang="ts" setup>
import {reactive, toRaw, onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import * as yup from 'yup'

// Reactive form data
const formData = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
  contactVia: ''
})

// Reactive object to hold errors occurred in form
const formErrors = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
  contactVia: ''
})

// Dropdown options
const contactViaOptions = reactive<string[]>([])

// Yup schema for form validation
const schema = yup.object().shape({
  name: yup.string().required('Name is required').matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces').max(255).min(2),
  email: yup.string().email('Invalid email format').required('Email is required'),
  contactVia: yup.string().required('Contact Via is required'),
  contact: yup.string().when('contactVia', {
    is: 'Phone', // or any other condition
    then: yup.string().length(10, 'Contact must be exactly 10 digits').required('Contact is required'),
    otherwise: yup.string().notRequired()
  }),
  address: yup.string().required('Address is required').min(2).max(255),
  message: yup.string().required('Message is required').min(10)
})

// Fetch contact via options from the backend
const fetchContactViaOptions = async () => {
  try {
    const response = await axios.get('/api/contacts/contactvia')
    contactViaOptions.push(...response.data)
  } catch (error) {
    console.error('Error fetching contact via options:', error)
  }
}

// Function to validate individual fields
const validateField = async (field: keyof typeof formData) => {
  try {
    await schema.validateAt(field, formData)
    formErrors[field] = ''
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      formErrors[field] = err.message
    }
  }
}

// Validate entire form
const validateForm = async () => {
  try {
    // Reset the form errors before validation is done again
    Object.keys(formErrors).forEach(key => (formErrors[key] = ''))

    await schema.validate(formData, {abortEarly: false})
    return true
  } catch (err) {
    // Setting form errors for each field
    if (err instanceof yup.ValidationError) {
      err.inner.forEach(validationError => {
        formErrors[validationError.path] = validationError.message
      })
    }
    return false
  }
}

// Handle form submission
const handleSubmit = async () => {
  // Validate the form before making the request
  const isValid = await validateForm()

  try {
    const response = await axios.post('/api/contacts', toRaw(formData))
    console.log('Response:', response.data)
    alert(`Thank you, ${formData.name}! Your message has been sent.`)

    // Clear form data after successful submission
    formData.name = ''
    formData.email = ''
    formData.contact = ''
    formData.address = ''
    formData.message = ''
    formData.contactVia = ''
  } catch (error) {
    console.error('Error sending message:', error)
    alert('An error occurred while sending your message. Please try again.')
  }
}

const router = useRouter()

const navigateToViewContact = () => {
  router.push({name: 'viewcontact'})
}

// Fetch options on component mount
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

  button {
    font-size: 1.875rem;
  }
}

@media (min-width: 1380px) {
  .contact {
    height: 100vh;
  }
}
</style>
