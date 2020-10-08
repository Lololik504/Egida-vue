import axios from 'axios'

export default {
    actions: {
        async login({commit}, data) {
            try {
                return await new Promise((resolve, reject) => {
                    commit('auth_request')
                    // let Data = new FormData()
                    // Data.append('username', data['username'])
                    // Data.append('password', data['password'])
                    // console.log(data['username'])
                    // console.log(data['password'])
                    axios.post("http://192.168.0.2:8000/accounts/login/",
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