<template>
  <div>
    <div class="main-header">
      <div class="welcome-header">
        <img data-entity-type="file" src="@/assets/gerb.png" class="image" alt="Герб">
        <div class="text-header">
          <p class="welcome-header">МЭРИЯ ГОРОДА НОВОСИБИРСКА <br> ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ</p>
        </div>
        <img data-entity-type="file" src="@/assets/gerb-2.png" class="image" alt="Герб 2">
      </div>
      <div class="second-row">
        <div class="btn-container q-pa-md q-gutter-sm">
            <button v-if="isLoggedIn" class="btn waves-effect blue darken-4" @click.prevent="toMain">На главную</button>
            <button v-if="isLoggedIn && getPermission === '15'" class="btn waves-effect blue darken-4"
                    @click.prevent="toCard">Карточка
            </button>
            <button v-if="isLoggedIn && getPermission < 15" class="btn waves-effect blue darken-4"
                    @click.prevent="toDistr">Районы
            </button>
            <button v-if="!isLoggedIn" class="btn waves-effect blue darken-4" @click.prevent="toLogin">Войти</button>
            <button v-else class="btn waves-effect blue darken-4" @click.prevent="logout">Выйти</button>
        </div>
        <div class="to-home-text">
          <router-link to="/" class="router-text">
            УПРАВЛЕНИЕ ОБЕСПЕЧЕНИЯ БЮДЖЕТНОГО ПРОЦЕССА,<br/> МОНИТОРИНГА ОРГАНИЗАЦИИ
            ПИТАНИЯ И РЕСУРСНОГО СОПРОВОЖДЕНИЯ<br/> УЧРЕЖДЕНИЙ В СФЕРЕ ОБРАЗОВАНИЯ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  // components: {ToolBar},
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    getPermission: function () {
      return this.$store.getters.permission || localStorage.getItem('permission')
    }
  },
  methods: {
    logout: async function () {
      await this.$store.dispatch('logout')
          .then(() => {
            this.$emit('update')
            this.$router.push('/login?message=logout')
          })
    },
    async toLogin() {
      if (this.$route.name !== 'login')
        await this.$router.push("/login");
    },
    async toMain() {
      if (this.$route.name !== 'home')
        await this.$router.push("/");
    },
    async toCard() {
      if (this.$route.name !== 'schoolcard')
        await this.$router.push(`/schoolcard/${localStorage.getItem('inn')}`)
    },
    async toDistr() {
      if (this.$route.name !== 'districts')
        await this.$router.push("/districts");
    }
  }
}
</script>

<style scoped>

.router-text {
  color: white;
  text-decoration: none;
  font-size: calc(8px + 4 * (100vw / 1440));
}

.second-row {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-height: 50px;
}

.btn-container {
  min-height: 0;
}

.to-home-text {
  width: 60%;
  margin: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.image {
  margin: 0 20px;
}

.main-header {
  background-image: url("~@/assets/fon2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.welcome-header {
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: calc(12px + 4 * (100vw / 1440));
  margin-bottom: 10px;
}

@media (max-width: 480px) {
  .image {
    width: 20%;
    height: 20%;
  }

  .to-home-text {
    margin: auto 10px;
    font-size: xx-small;
  }

  .welcome-header {
    font-size: small;
  }
}

@media (max-width: 1200px) {
  .btn-container {
    display: flex;
    flex-direction: column;
  }
  /*.router-text {*/
  /*  font-size: medium;*/
  /*}*/
}

/*@media (max-width: 830px) {*/
/*  .router-text {*/
/*    font-size: small;*/
/*  }*/

/*}*/

</style>