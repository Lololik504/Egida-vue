import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from "./info";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        error: null,
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.info = {}
        },
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        error: state => state.error
    },
    modules: {
        auth, info
    }
})