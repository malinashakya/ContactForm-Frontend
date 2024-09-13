// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewContact from "@/views/ViewContact.vue"
import AddMessage from "@/views/AddMessage-VeeValidation.vue";
import ContactView from "@/views/ContactView-VeeValidation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/viewcontact',
      name: 'viewcontact',
      component: ViewContact,
    },
    {
      path: '/addmessage',
      name: 'addmessage',
      component: AddMessage,
    },
    {
      path: '/contactview',
      name: 'contactview',
      component: ContactView,
    },
  ],
})

export default router
