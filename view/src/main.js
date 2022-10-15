import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'
import $ from 'jquery'
window.$ = $

createApp(App).use(router).mount('#app')
