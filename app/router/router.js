import game_list from "~/pages/game_list.vue";
import game_registration from "~/pages/game_registration.vue";
const routes  = [
    {
        path: '/game_list',
        name:'Game List',
        component: game_list
    },
    {
        path: '/game-registration',
        name:'Game Register',
        component: game_registration
    }
];