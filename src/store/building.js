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
                console.log(e)
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
                console.log(e)
                throw e
            }
        },
        async fetchFieldsBuilding({commit}, {token, inn}) {
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/fields/building",
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
        },
        async fetchBuildings({dispatch, commit}, {token, inn}){
            try {
                return await new Promise((resolve, reject) => {
                    axios.get(server_path + "/api/all_buildings",
                        {
                            headers: {
                                "Authorization": "auth " + token,
                                'Content-Type': 'application/json',
                                "INN": inn
                            }
                            // responseType: 'blob'
                        })
                        .then(resp => {
                            // const url = window.URL.createObjectURL(new Blob([resp.data]));
                            // const link = document.createElement('a');
                            // link.href = url;
                            // link.setAttribute('download', 'export.xls'); //or any other extension
                            // document.body.appendChild(link);
                            // link.click();
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } catch (e) {
                throw e
            }
        },
        async fetchBuilding({dispatch, commit}, {token, id}){
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
    }
}