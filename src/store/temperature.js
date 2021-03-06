import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async fetchTemperatures({commit}, inn) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/temperature",
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
        async addTemperature({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/temperature/",
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
        async deleteTemperature({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.delete(server_path + "/api/temperature/",
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'auth ' + token,
                                'data': JSON.stringify(data)
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
        async updateTemperature({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/temperature/", data,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'auth ' + token
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
        }
    }
}