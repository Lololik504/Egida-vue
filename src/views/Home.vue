<template>
  <div class="container">
    <HomeList/>
  </div>
</template>

<script>
import HomeList from '@/components/HomeList'

export default {
  name: "Home",
  components: {HomeList},
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
  },
  async mounted() {
    if (!this.isLoggedIn) {
      await this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>