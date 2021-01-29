<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4> Карточка здания {{ street + ', ' + street_number }}</h4>
      <div class="q-gutter-md">
        <button class="btn waves-effect waves-light" @click="mainInfo">
          Сведения о здании
        </button>
        <button class="btn waves-effect waves-light" @click="temperature">
          Температурный режим
        </button>
        <button class="btn waves-effect waves-light" @click="characteristic">
          Характеристика здания
        </button>
        <button v-if="permission" class="btn waves-effect waves-light" @click.prevent="deleteBuilding">
          Удалить здание
        </button>
        <button class="btn waves-effect waves-light" @click="backPage">
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "BuildingCard",
  data: () => ({
    loading: true,
    street: '',
    street_number: '',
    permission: localStorage.getItem('permission') <= 10
  }),
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async mainInfo() {
      await this.$router.push(`/building/${this.$route.params['card']}`)
    },
    async temperature() {
      await this.$router.push(`/temperature/${this.$route.params['card']}`)
    },
    async characteristic() {
      await this.$router.push(`/characteristic/${this.$route.params['card']}`)
    },
    async backPage() {
      await this.$router.push(`/schoolbuilding/${localStorage.getItem('currentINN')}`)
    },
    async deleteBuilding() {
      try {
        const isConfirmed = confirm('Удалить данное здание?')
        if (isConfirmed) {
          const id = this.$route.params['card']
          await this.$store.dispatch('deleteBuilding', id)
          await this.backPage()
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['card']
    try {
      const resp = await this.$store.dispatch('fetchBuilding', {token, id})
      this.street = resp['street']
      this.street_number = resp['street_number']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>