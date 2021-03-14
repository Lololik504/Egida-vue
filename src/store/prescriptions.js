import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async fetchPrescription({commit}, {token, inn, url}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/orders/" + url + "/",
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
        async fetchPrescriptionById({commit}, {token, inn, url, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/orders/" + url + "/",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                'INN': inn,
                                'order-id': id
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
        async createPrescription({commit}, {file, url, token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/orders/" + url + "/",
                        file,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
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
        async updatePrescription({commit}, {file, url, token, inn, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/orders/" + url + "/",
                        file,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                "Authorization": "auth " + token,
                                'INN': inn,
                                'order-id': id
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
        async deletePrescription({commit}, {url, token, inn, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.delete(server_path + "/api/orders/" + url + "/",
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                "Authorization": "auth " + token,
                                'INN': inn,
                                'order-id': id
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