/* eslint-disable */
import axios from "axios";
import {server_path} from "@/local_settings";

export default {
    state: {
        info: {},
        districts: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        setDistricts(state, districts) {
            state.districts = districts;
        }
    },
    actions: {
        async fetchInfo({commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/school",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "INN": inn
                            }
                        })
                        .then(resp => {
                            const infoSchool = resp.data.data.school
                            commit('setInfo', infoSchool)
                            resolve(infoSchool)
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
        async fetchDistricts({commit}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/districts",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => {
                            const info = resp.data.data
                            commit('setDistricts', info)
                            resolve(info)
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
        async fetchDistrictsQuery({commit}) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/districts/query",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => {
                            const info = resp.data.data
                            commit('setDistricts', info)
                            resolve(info)
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
        async fetchFieldsDistricts({commit}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/filters",
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => {
                            const info = resp.data.data
                            resolve(info)
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
        async updateInfo({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/school/",
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
        async updatePersonal({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/personal/",
                        data,
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
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
        async updatePersonalPrikaz({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/personal/updater/",
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
        async updateRequisites({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.put(server_path + "/api/requisites/",
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
        async exportInfo({commit}){
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/export/",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                "data": JSON.stringify({
                                    full: true
                                })
                            },
                            responseType: 'blob'
                        })
                        .then(resp => {
                            const url = window.URL.createObjectURL(new Blob([resp.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'export.xls'); //or any other extension
                            document.body.appendChild(link);
                            link.click();
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
        ,
        async fetchAllModels({commit}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/fields/all_models",
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
        async sendMainInfo({commit}, data) {
            try {
                const token = localStorage.getItem('token')
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/export/",
                        {
                            headers: {
                                'Content-Disposition': 'inline; filename*=UTF-8',
                                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                                "Authorization": "auth " + token,
                                "data": JSON.stringify(data)
                            },
                            responseType: 'blob'
                        })
                        .then(resp => {
                            const url = window.URL.createObjectURL(new Blob([resp.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `Export_${new Date().toUTCString()}.xls`); //or any other extension
                            document.body.appendChild(link);
                            link.click();
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
    },
    getters: {
        info: state => state.info,
        districts: state => state.districts
    }

}