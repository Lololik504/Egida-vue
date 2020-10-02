<template>
  <div>
    <input v-model="login" type="text" placeholder="Login" class="x"/>
    <input v-model="password" type="password" placeholder="Password" class="x"/>
    <br>
    <button class="x" @click="setLogin">Войти</button>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Login",
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    setLogin() {
        $.ajax({
          url: "http://192.168.0.2:8000/auth/login/",
          type: "POST",
          data:{
            username: this.login,
            password: this.password
          },
          success: (response) => {
            console.log(response)
          },
          error: (response) => {
            console.log(response)
          }
        })
    },
  }
}
</script>

<style scoped>
.x {
  align-content: space-around;
  margin-left: 20px;
  margin-top: 50px;
}
</style>