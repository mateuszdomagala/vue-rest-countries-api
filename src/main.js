import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faMoon, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {faMoon as faMoonRegular} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faMoon, faMoonRegular, faArrowLeft)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
