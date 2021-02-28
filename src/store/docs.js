/* eslint-disable */
import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async fetchDocs({commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/docs",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                'INN': inn
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data.documents)
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
        async sendDocs({commit}, {file, inn, id}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/docs/",
                        file,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'multipart/form-data',
                                'INN': inn,
                                'doc-id': id,
                                'FILES': file
                            },
                            responseType: "blob"
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