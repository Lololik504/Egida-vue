<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4> Карточка учреждения {{ shortname }}</h4>
      <div class="q-gutter-md">
        <button class="btn waves-effect waves-light" @click="mainInfo">
          Сведения о юридическом лице
        </button>
        <button class="btn waves-effect waves-light" @click="toBuilding">
          Здания
        </button>
        <button class="btn waves-effect waves-light" @click="toDocs">
          Документация
        </button>
        <button v-if="permission" class="btn waves-effect waves-light" @click="deleteSchool">
          Удалить учреждение
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
    shortname: '',
    permission: localStorage.getItem('permission') <= 10,
    age: null
  }),
  methods: {
    mainInfo() {
      this.$router.push(`/school/${this.$route.params['card']}`)
    },
    toBuilding() {
      this.$router.push(`/schoolbuilding/${this.$route.params['card']}`)
    },
    toDocs() {
      this.$router.push(`/documents/${this.$route.params['card']}`)
    },
    async deleteSchool() {
      try {
        const isConfirmed = confirm('Удалить данное учреждение?')
        if (isConfirmed) {
          await this.$store.dispatch('deleteSchool', this.$route.params['card'])
          await this.$router.push('/districts')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['card']
      localStorage.setItem('currentINN', inn)
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