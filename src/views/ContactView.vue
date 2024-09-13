<template>
  <div>
    <h2>Contact Data</h2>
    <!-- Display loading message while data is being fetched -->
    <div v-if="loading">Loading...</div>
    <!-- Display error message if there is an issue fetching data -->
    <div v-if="error">{{ error }}</div>
    <!-- Display table only if data is loaded and no errors occurred -->
    <div class="p-d-flex p-flex-column p-ai-center p-4">
      <DataTable v-if="!loading && !error" :value="contacts" show-gridlines tableStyle="min-width: 50rem">
        <Column class="p-2" field="id" header="ID"></Column>
        <Column class="p-2" field="name" header="Name"></Column>
        <Column class="p-2" field="address" header="Address"></Column>
        <Column class="p-2" field="contact" header="Contact"></Column>
        <Column class="p-2" field="email" header="Email"></Column>
        <Column class="p-2 " field="message" header="Message"></Column>
        <Column class="p-2" header="Action">
          <template #body="slotProps">
            <!-- Button to open the edit dialog for a contact -->
            <Button class="m-2 p-2"
                    style="background: #eded07; border: 1px solid rgba(244,244,73,0.89); border-radius: 3px"
                    @click="openEditDialog(slotProps.data)"> Edit
            </Button>

            <!-- Button to delete a contact -->
            <Button class="m-2 p-2" style="background: red; border: 1px solid #e35555; border-radius: 3px"
                    @click="deleteContact(slotProps.data.id)">Delete
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- Edit Dialog -->
    <!-- This dialog appears when showEditDialog is true -->
    <Dialog v-model:visible="showEditDialog"
            :style="{ width: '30vw', background:'grey', padding:'10px',border: '1px solid grey' } "
            header="Edit Contact"
            modal>
      <!-- Form to update contact details -->
      <Form @submit="updateContact" class="contact-form">
        <div class="form-group p-mb-4">
          <label for="name">Name<span class="required">*</span></label>
          <Field
              id="name"
              v-model="editedContact.name"
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
              v-model="editedContact.email"
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
              v-model="editedContact.contact"
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
              v-model="editedContact.address"
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
              v-model="editedContact.message"
              as="textarea"
              name="message"
              placeholder="Your Message"
              rows="4"
              rules="required|min:10"
          />
          <ErrorMessage class="error" name="message"/>
        </div>

        <Button class="button p-2 m-2"
                style="background: #eded07; border: 1px solid rgba(244,244,73,0.89); border-radius: 3px " type="submit">
          Submit
        </Button>
        <!-- Button to close the dialog without making changes -->
        <Button class="button p-2 m-2 " style="background: red; border: 1px solid #e35555; border-radius: 3px"
                @click="closeEditDialog">
          Cancel
        </Button>

      </Form>

      <!-- Show success message if the contact was updated successfully -->
      <div v-if="updateSuccess" class="success-message mt-2">{{ updateSuccess }}</div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { ErrorMessage, Field, Form, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

// Define validation rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// Define types for the contact data
interface Contact {
  id: number;
  name: string;
  address: string;
  contact: string;
  email: string;
  message: string;
}

// Refs to hold contact details, loading state, and dialog state
const contacts = ref<Contact[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showEditDialog = ref(false);
const editedContact = ref<Contact | null>(null);
const updateSuccess = ref<string | null>(null);

// Fetch contact data when the component is mounted
onMounted(async () => {
  try {
    // Make a GET request to fetch contacts
    const response = await axios.get('/api/contacts');
    contacts.value = response.data.result; // Store the result in contacts
  } catch (err) {
    error.value = 'Failed to load contacts.'; // Set error message if request fails
    console.error('Error fetching contacts:', err); // Log error for debugging
  } finally {
    loading.value = false; // Set loading to false after request completes
  }
});

// Open the edit dialog and set the contact to be edited
const openEditDialog = (contact: Contact) => {
  editedContact.value = { ...contact }; // Create a copy of the contact for editing
  showEditDialog.value = true; // Show the edit dialog
};

// Close the edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false; // Hide the edit dialog
  editedContact.value = null; // Clear the edited contact
  updateSuccess.value = null; // Clear any success message
};

// Update contact details
const updateContact = async () => {
  if (editedContact.value) {
    try {
      // Make a PUT request to update the contact
      await axios.put(`/api/contacts/${editedContact.value.id}`, editedContact.value);
      // Update the contact list with the new data
      contacts.value = contacts.value.map(contact =>
          contact.id === editedContact.value!.id ? editedContact.value! : contact
      );
      updateSuccess.value = 'Contact updated successfully!'; // Set success message
    } catch (err) {
      error.value = 'Failed to update contact.'; // Set error message if update fails
      console.error('Error updating contact:', err); // Log error for debugging
    } finally {
      closeEditDialog(); // Close the edit dialog after update
    }
  }
};

// Handle delete contact
const deleteContact = async (id: number) => {
  try {
    // Make a DELETE request to remove the contact
    await axios.delete(`/api/contacts/${id}`);
    // Remove the deleted contact from the list
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  } catch (err) {
    error.value = 'Failed to delete contact.'; // Set error message if delete fails
    console.error('Error deleting contact:', err); // Log error for debugging
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ecf0f1;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: whitesmoke;
  font-size: 1rem;
  color: #333;
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

button:hover,
.p-button:hover {
  background: dodgerblue;
}

.error {
  color: rgba(255, 0, 0, 0.85);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.required {
  color: rgba(255, 0, 0, 0.85);
}
</style>
