// fronet-end js
import Vue from 'vue';
import 'bootstrap/scss/bootstrap.scss';  // treba bez ./ i patha, uzima iz node_modules
import App from './App.vue'; // master komponenta

import VueRouter from 'vue-router'; 
Vue.use(VueRouter); 

import routes from './router/routes';  // API route
const router = new VueRouter({routes});

var home = new Vue({
    el: "#app",
    render: h => h(App), // renderira App.vue SFC
    router
});