import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase
import {VueFire, VueFireAuth} from 'vuefire'
import { firebaseApp } from './config/firebase'


//SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
const vuetify = createVuetify({
    components,
    directives
})


// Firebase (Integración a vuejs)
app.use(VueFire,{
    firebaseApp,
    modules:[VueFireAuth()]
})

// SweetAlert
app.use(VueSweetalert2);


app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
