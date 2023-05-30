import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import './style.css'
import App from './App.vue'
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import Receitas from './pages/Receitas.vue'
import Despesas from './pages/Despesas.vue'
import Relatorio from './pages/Relatorio.vue'
import type { User } from './types'
import 'vue-toastification/dist/index.css'

const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/dashboard', component: Dashboard, name: 'dashboard' },
  { path: '/receitas', component: Receitas, name: 'receitas' },
  { path: '/despesas', component: Despesas, name: 'despesas' },
  { path: '/relatorio', component: Relatorio, name: 'relatorio' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

const token = ref('')
// const url = 'http://localhost:8080'
const url = 'https://fluxr-4wgfen3n5q-rj.a.run.app'
const user = ref({
  name: '',
  email: '',
  companyId: 0,
} as User)

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
app.provide('url', url)
app.provide('user', user)
app.use(Toast, options)
app.use(router)
app.mount('#app')
