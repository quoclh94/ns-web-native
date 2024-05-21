import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';
import TransportPlan from '../components/TransportPlan.vue';
import Home from '../components/Home.vue';
import api from '~/api/index';

Vue.use(VueRouter);
Vue.prototype.$api = api;

const router = new VueRouter({
  routes: [
    { path: '/Home', component: Home },
    { path: '/transportPlan', component: TransportPlan },
    { path: '*', redirect: '/Home' }
  ],
});
router.replace('/Home');

export default router;