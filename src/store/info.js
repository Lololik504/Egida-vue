/* eslint-disable */
import axios from "axios";
import {server_path} from "@/local_settings";

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
        async fetchInfo({commit}) {
            try {
                const token = localStorage.getItem('token')
                const inn = localStorage.getItem('inn')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/school/1",
                        {
                            headers: {
                                "Authorization": "Token " + token,
                                'Content-Type': 'application/json',
                                "username": inn,
                                "INN": inn
                            }
                        })
                        .then(resp => {
                            console.log('check')
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
        info: state => state.info
    }
}