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
          <q-btn v-if="username!==''" color='blue-10' text-color="white" label="Logout" @click="Logout"
                 class="login-but"/>
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
import $ from "jquery";
import * as sp from "@/local_settings";

export default {
  name: "Header",
  // components: {ToolBar},
  data() {
    return {
      authed: false
    }
  },
  computed: {
    username: function () {
      this.authed;
      if (sessionStorage.getItem('username') !== null) {
        return sessionStorage.getItem('username');
      } else return ''
    },
  },
  mounted() {
  this.$root.$on('logined', (new_username)=>{
    this.authed=!this.authed
    this.username=new_username
  })
    },
  methods: {
    goLogin() {
      this.$router.push({name: "login"}).catch(() => {
      });
    },
    Logout() {
      sessionStorage.clear()
      $.ajax({
        url: sp.server_path + 'auth/token/login/',
        type: "POST",
        data: {
        }
      })
    },
    update() {
      this.authed = !this.authed
    }
  }
}
</script>

<style scoped>
.router-text {
  color: white;
  text-decoration: none;
}

.second-row {
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