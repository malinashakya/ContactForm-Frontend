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
      <form class="p-fluid" @submit.prevent="updateContact">
        <!-- Input for the contact's name -->
        <div class="field">
          <label for="name">Name:<span class="required">*</span></label>
          <InputText id="name" v-model="editedContact.name" class="p-3 custom-input " required type="text"/>
          <div v-if="formErrors.name" class="error">{{ formErrors.name }}</div>
        </div>

        <!-- Input for the contact's address -->
        <div class="field">
          <label for="address">Address:<span class="required">*</span></label>
          <InputText id="address" v-model="editedContact.address" class="p-3 custom-input" required type="text"/>
          <div v-if="formErrors.address" class="error">{{ formErrors.address }}</div>
        </div>

        <!-- Input for the contact's phone number -->
        <div class="field">
          <label for="contact">Contact:<span class="required">*</span></label>
          <InputText id="contact" v-model="editedContact.contact" class="p-3 custom-input" required type="text"/>
          <div v-if="formErrors.contact" class="error">{{ formErrors.contact }}</div>
        </div>

        <!-- Input for the contact's email -->
        <div class="field">
          <label for="email">Email:<span class="required">*</span></label>
          <InputText id="email" v-model="editedContact.email" class="p-3 custom-input" required type="email"/>
          <div v-if="formErrors.email" class="error">{{ formErrors.email }}</div>
        </div>

        <!-- Textarea for the contact's message -->
        <div class="field">
          <label for="message">Message:<span class="required">*</span></label>
          <InputText id="message" v-model="editedContact.message" class="p-2 border rounded custom-textarea"
                     required></InputText>
          <div v-if="formErrors.message" class="error">{{ formErrors.message }}</div>
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

      </form>

      <!-- Show success message if the contact was updated successfully -->
      <div v-if="updateSuccess" class="success-message mt-2">{{ updateSuccess }}</div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import * as yup from 'yup';


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
const formErrors=ref({
  name:'',
  address:'',
  contact:'',
  email:'',
  message:'',
});

const schema=yup.object().shape({
  name:yup.string().min('2').required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
  address: yup.string().required('Address is required'),
  contact:yup.string().required('Contact is required'),
  email:yup.string().required('Email is required').email('Invalid email'),
  message:yup.string().required('Message is required'),
})

const validateField = async (field: keyof Contact) => {
  try {
    if (editedContact.value) {
      await schema.validateAt(field, editedContact.value);
      formErrors.value[field] = '';
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      formErrors.value[field] = err.message;
    }
  }
};

const validateForm = async () => {
  try {
    // Resetting form errors before validation
    Object.keys(formErrors.value).forEach(key => (formErrors.value[key] = ''));

    // Validate form data against Yup schema
    if (editedContact.value) {
      await schema.validate(editedContact.value, { abortEarly: false });
      return true;
    }
    return false;
  } catch (err) {
    // Set form errors for each field
    if (err instanceof yup.ValidationError) {
      err.inner.forEach(validationError => {
        formErrors.value[validationError.path] = validationError.message;
      });
    }
    return false;
  }
};

// Watchers for individual fields
watch(() => editedContact.value?.name, () => validateField('name'));
watch(() => editedContact.value?.email, () => validateField('email'));
watch(() => editedContact.value?.address, () => validateField('address'));
watch(() => editedContact.value?.message, () => validateField('message'));
watch(() => editedContact.value?.contact, () => validateField('contact'));

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
.custom-input,
.custom-textarea {
  background-color: white;
  color:black;
  border: 1px solid white;
  border-radius: 5px;
  margin-left:10px;
}

.custom-textarea {
  height: 100px;
}

.button {
  background: lightgray;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 90px;
  height: 40px;
  color: black;
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
</style>
