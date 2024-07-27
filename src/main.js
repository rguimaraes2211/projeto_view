import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueTheMask from 'vue-the-mask';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';

const app = createApp(App);
app.use(VueTheMask);
app.use(router);
app.mount('#app');
