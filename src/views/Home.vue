<template>
  <div>
    <h2>Home page</h2>
    <h2 v-if="username!==''">Вы вошли как {{username}}</h2>
    <button @click="goLogin">Log in</button>
    <q-btn color="white" text-color="black" label="Standard" />
    <br>
    <router-link to="/districts">Districts</router-link>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="white" text-color="black" label="Standard" />
      <q-btn color="primary" label="Primary" />
      <q-btn color="secondary" label="Secondary" />
      <q-btn color="amber" glossy label="Amber" />
      <q-btn color="brown-5" label="Brown 5" />
      <q-btn color="deep-orange" glossy label="Deep Orange" />
      <q-btn color="purple" label="Purple" />
      <q-btn color="black" label="Black" />
    </div>
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