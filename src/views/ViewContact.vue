<template>
  <div>
    <h2>Contact Data</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <table v-if="!loading && !error">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Message</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>{{ contact.id }}</td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.address }}</td>
        <td>{{ contact.contact }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ contact.message }}</td>
        <td>
          <button @click="openEditDialog(contact)">Edit</button>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Edit Dialog -->
    <div v-if="showEditDialog" class="dialog-overlay">
      <div class="dialog-content">
        <h3>Edit Contact</h3>
        <form @submit.prevent="updateContact">
          <label>Name:</label>
          <input v-model="editedContact.name" type="text" required />

          <label>Address:</label>
          <input v-model="editedContact.address" type="text" required />

          <label>Contact:</label>
          <input v-model="editedContact.contact" type="text" required />

          <label>Email:</label>
          <input v-model="editedContact.email" type="email" required />

          <label>Message:</label>
          <textarea v-model="editedContact.message" required></textarea>

          <button type="submit">Update</button>
          <button type="button" @click="closeEditDialog">Cancel</button>
        </form>
        <div v-if="updateSuccess" class="success-message">{{ updateSuccess }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define types of the contact data
interface Contact {
  id: number;
  name: string;
  address: string;
  contact: string;
  email: string;
  message: string;
}

// Define refs to hold the contacts details, loading state, and dialog state
const contacts = ref<Contact[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showEditDialog = ref(false);
const editedContact = ref<Contact | null>(null);
const updateSuccess = ref<string | null>(null);

// Fetch data from API when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('/api/contacts');
    contacts.value = response.data.result;
  } catch (err) {
    error.value = 'Failed to load contacts.';
    console.error('Error fetching contacts:', err);
  } finally {
    loading.value = false;
  }
});

// Open the edit dialog and set the contact to be edited
const openEditDialog = (contact: Contact) => {
  editedContact.value = { ...contact }; // Create a copy to edit
  showEditDialog.value = true;
};

// Close the edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false;
  editedContact.value = null;
  updateSuccess.value = null;
};

// Update contact details
const updateContact = async () => {
  if (editedContact.value) {
    try {
      await axios.put(`/api/contacts/${editedContact.value.id}`, editedContact.value);
      // Update the contact list with the new data
      contacts.value = contacts.value.map(contact =>
          contact.id === editedContact.value!.id ? editedContact.value! : contact
      );
      updateSuccess.value = 'Contact updated successfully!';
    } catch (err) {
      error.value = 'Failed to update contact.';
      console.error('Error updating contact:', err);
    } finally {
      closeEditDialog();
    }
  }
};

// Handle delete contact
const deleteContact = async (id: number) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  } catch (err) {
    error.value = 'Failed to delete contact.';
    console.error('Error deleting contact:', err);
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
