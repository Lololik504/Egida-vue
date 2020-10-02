<template>
  <div>
    <h2>Home page</h2>
    <h2 v-if="username!==''">Вы вошли как {{username}}</h2>
    <button @click="goLogin">Log in</button>
    <br>
    <router-link to="/districts">Districts</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    let user_name = ''
    if (sessionStorage.getItem('username') != null){
      user_name = sessionStorage.getItem('username')
    }
    return {
      "username": user_name
    }
  },
  methods: {
    goLogin() {
      this.$router.push({name: "login"})
    }
  }
}
</script>

<style scoped>
button{
  margin-bottom: 20px;
}
</style>