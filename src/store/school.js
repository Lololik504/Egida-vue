import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async fetchFieldsSchool({commit}){
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/fields/school",
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createSchool({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/school/",
                        data,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "auth " + token,
                            }
                        })
                        .then(resp => {
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteSchool({commit} , inn) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.delete(server_path + "/api/school",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "inn": inn
                            }
                        })
                        .then(resp => {
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchPersonal({commit}, inn) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/personal",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "INN": inn
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRequisites({commit}, inn) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/requisites",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "INN": inn
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}