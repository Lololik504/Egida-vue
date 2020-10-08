/* eslint-disable */
import axios from "axios";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const token = localStorage.getItem('token')
                console.log(token)
                const inn = localStorage.getItem('inn')
                console.log(inn)
                return await new Promise((resolve, reject) => {
                    axios.get("http://192.168.0.2:8000/api/school/1",
                        {
                            headers: {
                                "Authorization": "Token " + token,
                                'Content-Type': 'application/json',
                                "username": inn,
                                "INN": inn
                            }
                        })
                        // axios.get("http://192.168.0.2:8000/accounts/login/", data, {headers: {'Content-Type': 'application/json;'}})
                        .then(resp => {
                            console.log('check')
                            console.log(resp)
                            const infoSchool = resp.data.data.school
                            console.log(infoSchool)
                            commit('setInfo', infoSchool)
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        info: s => s.info
    }
}