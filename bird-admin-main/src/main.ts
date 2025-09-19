import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Toast, { type PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { fakeBackend } from '@/utils/helpers/fake-backend';

// print
import print from 'vue3-print-nb';
const options: PluginOptions = {
    timeout: 3000, 
  };
const app = createApp(App);
fakeBackend();
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(Toast, options);
app.use(vuetify).mount('#app');
