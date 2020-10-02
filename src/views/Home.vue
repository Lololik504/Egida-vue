<template>
  <div>
    <h2>Home page</h2>
    <button @click="goLogin">Log in</button>
    <br>
    <router-link to="/districts">Districts</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
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