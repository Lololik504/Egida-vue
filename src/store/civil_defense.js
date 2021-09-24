import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async fetchZPPP({commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/zppp/",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                'INN': inn,
                                'get-all': 'get-all'
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
        async fetchZPPPById({commit}, {inn, id}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/zppp/",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                'INN': inn,
                                'zppp-id': id
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
        async createZPPP({commit}, {file, inn}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/zppp/",
                        file,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "auth " + token,
                                'INN': inn
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
        async updateZPPP({commit}, {file, inn, id}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/zppp/",
                        file,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "auth " + token,
                                'INN': inn,
                                'zppp-id': id
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
        async deleteZPPP({commit}, {inn, id}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.delete(server_path + "/api/zppp/",
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "auth " + token,
                                'INN': inn,
                                'zppp-id': id
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