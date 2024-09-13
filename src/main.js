import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// For Prime flex
import 'primeflex/primeflex.css';
import Aura from '@primevue/themes/nora';

//For prime Icon
import 'primeicons/primeicons.css';
import InputText from "primevue/inputtext";
import Button from "primevue/button";


library.add(fas, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('InputText', InputText)
app.mount('#app')
