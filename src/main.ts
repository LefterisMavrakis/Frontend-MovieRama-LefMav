import { createApp } from 'vue'
import '@/styles/app.scss'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


library.add(faTimes, faUser, faStar, faSpinner, faChevronLeft, faChevronRight)

createApp(App).use(router).use(axios).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
