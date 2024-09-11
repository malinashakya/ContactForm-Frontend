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
          <button @click="editContact(contact.id)">Edit</button>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
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

// Define refs to hold the contacts details and loading state
const contacts = ref<Contact[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

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

// Handle edit contact
const editContact = (id: number) => {
  console.log(`Edit contact with id: ${id}`);
  // Implement your edit logic here
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
</style>
