import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import MainPage from './components/pages/MainPage'
import MyListingsPage from './components/pages/MyListingsPage'
import AboutPage from './components/pages/AboutPage'
import './mainStyle.css';

const routes = [
  { path: '/', redirect: { path: '/houses' }, component: MainPage },
  { path: '/houses', component: MainPage },
  { path: '/my-listings', component: MyListingsPage },
  { path: '/about', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
const pinia = createPinia()

const app = createApp(App);

app.use(pinia);
app.use(router); 

app.mount('#app');