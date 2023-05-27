import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import './style.css'
import App from './App.vue'
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import 'vue-toastification/dist/index.css'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, name: 'dashboard' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

const token = ref('')

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

app.provide('token', token)
app.use(Toast, options)
app.use(router)
app.mount('#app')
