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
                            console.log(resp)
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                console.log(e)
            }
        },
        async fetchBuilding({commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/building",
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
                throw e
            }
        }
    },
    getters: {
        info: state => state.info,
        districts: state => state.districts
    }

}