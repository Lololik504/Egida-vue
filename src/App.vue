<template>
  <div id="app" class="wrapper">
    <Header class="header" :key="key" @update="update"/>

    <router-view class="content"/>
    <Footer class="footer"/>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {Footer, Header},
  data() {
    return {
      key: 0
    }
  },
  methods: {
    update() {
      this.key += 1
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, async function (err) {
      return await new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
}
</script>


<style>

@import '~materialize-css/dist/css/materialize.min.css';

{
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;

  min-height: 100%;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}

</style>