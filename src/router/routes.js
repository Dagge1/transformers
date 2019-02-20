import Home from '../components/Home.vue';
import Add from '../components/Add.vue';
import Edit from '../components/Edit.vue';

export default [
    {
        path: '/',   // main komponenta u kojoj je sve ostalo
        name: 'home', 
        component: Home 
    },
    {
        path: '/add',   // str. az dodavanje novog Transformera
        name: 'add', 
        component: Add 
    },
    {
        path: '/edit',   // str. az dodavanje novog Transformera
        name: 'edit', 
        component: Edit,
        props: true  // omogućava slanje podataka sa props putem router link 
    },
    {
        path: '*',    // za sve ostale route, umjesto 404
        redirect: {name: 'home'}
    } 
];