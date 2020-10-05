<template>
  <div>
  <div class="main-header">
    <div class="welcome-header">
      <img data-entity-type="file" src="@/assets/gerb.png" class="image">
      <div class="text-header">
      <h2 class="welcome-header" style="margin: 0">Home page</h2>
        <br>
      <h4 v-if="username!==''" class="welcome-header" style="margin: 0">Вы вошли как {{ username }} </h4>
      </div>
      <img data-entity-type="file" src="@/assets/gerb-2.png" class="image">
    </div>
    <q-btn color="white" text-color="black" label="Log in" @click="goLogin" class="login-but"/>
    <q-btn color='blue-10' text-color="white" label="Logout" @click="Logout" class="login-but"/>
  </div>
<!--  <ToolBar/>-->
  <hr>
  </div>
</template>

<script>
// import ToolBar from "@/components/ToolBar";
export default {
  name: "Header",
  // components: {ToolBar},
  data() {
    let user_name = ''
    if (sessionStorage.getItem('username') != null) {
      user_name = sessionStorage.getItem('username')
    }
    return {
      "username": user_name
    }
  },
  methods: {
    goLogin() {
      this.$router.push({name: "login"})
    },
    Logout() {
      sessionStorage.clear()
      this.$router.push({name: "home"})
    }
  }
}
</script>

<style scoped>
.main-header {
  background-image: url("~@/assets/fon2.jpg");
}

.login-but {
  position: center;
  left: 5%;
  margin-right: 5px;
  transform: translateY(-50%);
}

.welcome-header {
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.text-header{
  margin: 0px;
}

</style>