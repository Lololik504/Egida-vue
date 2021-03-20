/* eslint-disable */
import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    actions: {
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
        async fetchIndoors({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/indoor_areas",
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
        async fetchSecurity({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/safety_system",
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
        async fetchLandImprovement({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/territory_improvement",
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
        async fetchSport({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/sports_facilities",
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
        async fetchEnvironment({dispatch, commit}, {token, id}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building/accessible_environment",
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
        async sendConstructionInfo({dispatch, commit}, file) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/building_construction/",
                        file,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                "Authorization": "auth " + token
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
                    axios.put(server_path + "/api/building/engineering_communication/",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'multipart/form-data'
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
        async sendEngineeringInfoJSON({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/engineering_communication/",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json'
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
        async sendIndoorInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/indoor_areas/",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'multipart/form-data'
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
        async sendSecurityInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/safety_system/",
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
        async sendLandImprovementInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/territory_improvement/",
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
        async sendSportInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/sports_facilities/",
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
        async sendEnvironmentInfo({dispatch, commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/building/accessible_environment/",
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
        }
    }
}
