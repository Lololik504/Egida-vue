/* eslint-disable */
import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
        async createBuilding({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.post(server_path + "/api/building/",
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
        async updateBuilding({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/",
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
        async fetchFieldsBuilding({commit}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/fields/building",
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
        async fetchBuildings({dispatch, commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/all_buildings",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "INN": inn
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
        async fetchBuilding({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": id
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data[0])
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
        async fetchConstruction({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/building_construction",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": id
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data[0])
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
        async fetchEngineering({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/engineering_communication",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": id
                            }
                        })
                        .then(resp => {
                            resolve(resp.data.data[0])
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
        async sendConstructionInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/building_construction",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": data.id
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
        async sendEngineeringInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/engineering_communication",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": data.id
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
        async deleteBuilding({commit}, id) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.delete(server_path + "/api/building",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "id": id
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