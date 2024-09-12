<template>
  <div>
    <h2>Contact Data</h2>
    <!-- Display loading message while data is being fetched -->
    <div v-if="loading">Loading...</div>
    <!-- Display error message if there is an issue fetching data -->
    <div v-if="error">{{ error }}</div>
    <!-- Display table only if data is loaded and no errors occurred -->

    <DataTable v-if="!loading && !error" :value="contacts" tableStyle="min-width: 50rem" show-gridlines>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="address" header="Address"></Column>
      <Column field="contact" header="Contact"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="message" header="Message"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <!-- Button to open the edit dialog for a contact -->
          <Button @click="openEditDialog(slotProps.data)" > Edit </Button>

          <!-- Button to delete a contact -->
          <Button @click="deleteContact(slotProps.data.id)">Delete</Button>
        </template>
      </Column>
    </DataTable>

    <!-- Edit Dialog -->
    <!-- This dialog appears when showEditDialog is true -->
    <div v-if="showEditDialog" class="dialog-overlay">
      <div class="dialog-content">
        <h3>Edit Contact</h3>
        <!-- Form to update contact details -->
        <form @submit.prevent="updateContact">
          <!-- Input for the contact's name -->
          <label>Name:</label>
          <input v-model="editedContact.name" required type="text"/>

          <!-- Input for the contact's address -->
          <label>Address:</label>
          <input v-model="editedContact.address" required type="text"/>

          <!-- Input for the contact's phone number -->
          <label>Contact:</label>
          <input v-model="editedContact.contact" required type="text"/>

          <!-- Input for the contact's email -->
          <label>Email:</label>
          <input v-model="editedContact.email" required type="email"/>

          <!-- Textarea for the contact's message -->
          <label>Message:</label>
          <textarea v-model="editedContact.message" required></textarea>

          <!-- Button to submit the form and update the contact -->
          <button type="submit">Update</button>
          <!-- Button to close the dialog without making changes -->
          <button type="button" @click="closeEditDialog">Cancel</button>
        </form>
        <!-- Show success message if the contact was updated successfully -->
        <div v-if="updateSuccess" class="success-message">{{ updateSuccess }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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
  editedContact.value = {...contact}; // Create a copy of the contact for editing
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
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

/* Dialog styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.dialog-content h3 {
  margin-top: 0;
}

.dialog-content form {
  display: flex;
  flex-direction: column;
}

.dialog-content label {
  margin: 5px 0 2px;
}

.dialog-content input,
.dialog-content textarea {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-content button {
  margin: 5px 0;
}
</style>
