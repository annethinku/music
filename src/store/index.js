import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nickname: sessionStorage.getItem('name')?sessionStorage.getItem('name'):'',
        avatarUrl: sessionStorage.getItem('avatarUrl')?sessionStorage.getItem('avatarUrl'):'',
        userId:  sessionStorage.getItem('userId')?sessionStorage.getItem('userId'):0
    },
    getters: {

    },
    mutations: {
        changeUser(state, n) {
            state.nickname = n;
            sessionStorage.setItem('name',n);
        },
        changeImg(state, a) {
            state.avatarUrl = a;
            sessionStorage.setItem('avatarUrl',a);
        },
        changeUserid(state, id) {
            state.userId = id;
            sessionStorage.setItem('userId',id);
        }
    },
    actions: {
        changeUser(state, n) {
            state.commit('changeUser', n);
        },
        changeImg(state, a) {
            state.commit('changeImg', a);
        },
        changeUserid(state, id) {
            state.commit('changeUserid', id);
        }
    }
})
export default store;