import M from 'materialize-css'
import messages from "@/utils/messages";

export default {
    install(Vue) {
        Vue.prototype.$message = function (html) {
            M.toast({html})
        }

        Vue.prototype.$showMessage = function (html) {
            M.toast({html: messages[html]})
        }

        Vue.prototype.$error = function (html){
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }

}
