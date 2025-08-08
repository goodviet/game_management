import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas, faPlus,   faSearch,
  faTrash,
  faPenToSquare,
  faArrowUpRightFromSquare,
  faAngleDown,
  faUpRightFromSquare
 } from '@fortawesome/free-solid-svg-icons'


library.add(faHome, faUser, fas, faPlus, faSearch, faTrash, faPenToSquare, faArrowUpRightFromSquare, faAngleDown, faUpRightFromSquare)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
