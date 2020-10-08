import axios from 'axios'
import {server_path} from "@/local_settings";


export default {
    actions: {
        async login({commit}, data) {
            try {
                return await new Promise((resolve, reject) => {
                    commit('auth_request')
                    axios.post(server_path + "/accounts/login/",
                        data,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => {
                            const dataInResponse = resp.data.data
                            const token = dataInResponse.token
                            // console.log(token)
                            const user = dataInResponse.user
                            const permission = user['permission']
                            // console.log(user)
                            // console.log(permission)
                            console.log(resp)
                            localStorage.setItem('token', token)
                            localStorage.setItem('inn', user['username'])
                            localStorage.setItem('permission', permission)
                            axios.defaults.headers.common['Authorization'] = 'Token' + token
                            commit('auth_success', token, user)
                            resolve(resp)
                        })
                        .catch(err => {
                            commit('auth_error')
                            console.log('remove')
                            localStorage.removeItem('token')
                            localStorage.removeItem('inn')
                            localStorage.removeItem('permission')
                            reject(err)
                        })
                })
            } catch (e) {
                console.log(e)
            }
        },
        async logout({commit}) {
            return await new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('inn')
                localStorage.removeItem('permission')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    }
}