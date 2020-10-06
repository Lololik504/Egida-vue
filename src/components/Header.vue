<template>
  <div>
    <div class="main-header">
      <div class="welcome-header">
        <img data-entity-type="file" src="@/assets/gerb.png" class="image">
        <div class="text-header">
          <p class="welcome-header" style="margin: 0">МЭРИЯ ГОРОДА НОВОСИБИРСКА<br>
            ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ</p>
          <br>
          <h4 v-if="username!==''" class="welcome-header" style="margin: 0">Вы вошли как {{ username }} </h4>
        </div>
        <img data-entity-type="file" src="@/assets/gerb-2.png" class="image">
      </div>
      <div class="second-row">
        <div class="btn-container">
          <q-btn color="white" text-color="black" label="Log in" @click="goLogin" class="login-but"/>
          <q-btn color='blue-10' text-color="white" label="Logout" @click="Logout" class="login-but"/>
        </div>
        <div class="to-home-text">
          <router-link to="/" class="router-text">Управление обеспечения бюджетного процесса и ресурсного сопровождения
            учреждений в сфере
            образования мэрии г. Новосибирска
          </router-link>
        </div>
      </div>
    </div>
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
.router-text {
  color: white;
  text-decoration: none;
}

.second-row{
  position: relative;
  display: inline-flex;
  width: 100%;
  min-height: 50px;
}

.to-home-text {
  width: 40%;
  margin: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}

.image {
  margin-left: 20px;
  margin-right: 20px;
}

.main-header {
  background-image: url("~@/assets/fon2.jpg");
}

.welcome-header {
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  text-align: center;
  font-size: large;
}

.text-header {
  margin-top: 15px;
}

.btn-container {
  flex: 0 0 auto;
  margin-left: 3%;
}

.login-but {
  left: 5px;
  margin-right: 5px;
}

</style>