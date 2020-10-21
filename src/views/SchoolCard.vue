<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
    <h4> Карточка учреждения {{shortname}}</h4>
      <div class="btn-container">
    <button class="btn waves-effect waves-light" v-on:click="mainInfo">
      Сведения о юридическом лице
    </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolCard',
  data: () => ({
    loading: true,
    shortname: ''
  }),
  methods: {
    mainInfo() {
      this.$router.push(`/school/${this.$route.params['card']}`)
    }
  },
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['card']
      if (!Object.keys(info).length || info['INN'] !== inn) {
        info = await this.$store.dispatch('fetchInfo', {token, inn})
      }
      this.loading = false
      this.shortname = info['shortname']
    } catch (e) {
      console.log(e)
    }
  }
}
</script>