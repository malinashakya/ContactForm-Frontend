<template>
  <section class="contact">
    <!-- Greeting Section -->
    <div class="greet">
      <Button @click="navigateToViewContact" class="view-contact-button">
        View Contact
      </Button>
      <h2>Contact Me</h2>
      <h3>Let's Greet and Meet.</h3>
    </div>

    <!-- Contact Form Section -->
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group p-mb-4"> <!-- Add margin-bottom using PrimeFlex -->
        <label for="name" class="p-label">Name</label>
        <InputText
            id="name"
            v-model="formData.name"
            placeholder="Your Name"
            required
            class="p-inputtext p-component custom-input"
        />
      </div>
      <div class="form-group p-mb-4">
        <label for="email">Email</label>
        <InputText
            id="email"
            v-model="formData.email"
            placeholder="Your Email"
            required
            type="email"
            class="p-inputtext p-component custom-input"
        />
      </div>
      <div class="form-group p-mb-4">
        <label for="contact">Contact</label>
        <InputText
            id="contact"
            v-model="formData.contact"
            placeholder="Your Contact"
            required
            type="text"
            class="p-inputtext p-component custom-input"
        />
      </div>
      <div class="form-group p-mb-4">
        <label for="address">Address</label>
        <InputText
            id="address"
            v-model="formData.address"
            placeholder="Your Address"
            required
            type="text"
            class="p-inputtext p-component custom-input"
        />
      </div>
      <div class="form-group p-mb-4">
        <label for="message">Message</label>
        <InputText
            id="message"
            v-model="formData.message"
            placeholder="Your Message"
            required
            class="p-inputtext p-component custom-input text-area"
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { reactive, toRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const formData = reactive({
  name: '',
  email: '',
  contact: '',
  address: '',
  message: '',
})

const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/contacts', toRaw(formData))
    console.log('Response:', response.data)
    alert(`Thank you, ${formData.name}! Your message has been sent.`)
    formData.name = ''
    formData.email = ''
    formData.contact = ''
    formData.address = ''
    formData.message = ''
  } catch (error) {
    console.error('Error sending message:', error)
    alert('An error occurred while sending your message. Please try again.')
  }
}

const router = useRouter()

const navigateToViewContact = () => {
  router.push({ name: 'viewcontact' })
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
  height: 100px; /* Specific height for text area */
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

