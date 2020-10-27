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
        }
    }
}