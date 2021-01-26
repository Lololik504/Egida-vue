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
      <button class="btn waves-effect waves-light auth-submit" @click="login">Войти</button>
    </div>

  </div>
</template>

<script>
import messages from "@/utils/messages";
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
     async login() {
      const formData = {
        username: this.username,
        password: this.password
      }
      try {
        const resp = await this.$store.dispatch('login', formData)
        const permission = localStorage.getItem('permission')
        if (permission === '15') {
          await this.$router.push(`/schoolcard/${resp.user['username']}`)
        } else if (permission <= '10') {
          await this.$router.push('/districts')
        } else await this.$router.push('/')
      } catch (e) {
        console.log(e)
        await this.$router.push('/login?message=wrong-password')
        this.showMessage()
      }
    },
    showMessage() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
    }
  },
  mounted() {
    this.showMessage()
  },
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