<template>
  <div class="container">
    <div class="auth-card">
      <h5>Вход</h5>
      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
        <input id="icon_prefix" type="text" v-model="username">
        <label for="icon_prefix">ИНН</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">vpn_key</i>
        <input id="vpn_key" type="password" v-model="password">
        <label for="vpn_key">Пароль</label>
      </div>

      <br>
      <button class="btn waves-effect waves-light auth-submit" v-on:click="login">Войти</button>
    </div>

  </div>
</template>

<script>
// import $ from 'jquery'
import * as sp from "@/local_settings"

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      serverp: sp.server_path,
    }
  },
  methods: {
    // setLogin() {
    //   let vueObj = this;
    //   $.ajax({
    //     url: sp.server_path + 'auth/token/login/',
    //     type: "POST",
    //     data: {
    //       username: this.username,
    //       password: this.password
    //     },
    //     success: (response) => {
    //       sessionStorage.setItem("auth_token", response.data.attributes.auth_token)
    //       sessionStorage.setItem("username", this.username)
    //       console.log(response.data.attributes.auth_token)
    //       vueObj.$root.$emit("logined", vueObj.login)
    //       this.$router.push({name: "home"}).catch(() => {
    //       });
    //     },
    //     error: (response) => {
    //       console.log(response)
    //       this.password = ''
    //       alert('Введёт неправильный логин и/или пароль')
    //     }
    //   })
    // },
    login: async function () {
      const formData = {
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        const permission = localStorage.getItem('permission')
        console.log(permission)
        if (permission === '15') {
          await this.$router.push('/school')
        } else if (permission === '10'){
          await this.$router.push('/districts')
        } else await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }

    }
  }
}
</script>

<style scoped>
/*.x {*/
/*  max-width: 200px;*/
/*  align-content: space-around;*/
/*  margin-left: 20px;*/
/*  margin-top: 50px;*/
/*}*/
.auth-card {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}
.input-field {
  width: 400px;
  align-self: center;
}
h5 {
  margin: 20px auto;
}

button {
  max-width: 150px;
  margin: auto;
}
</style>