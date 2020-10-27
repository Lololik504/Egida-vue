<template>
  <div class="container">
    <h4>Здания учреждения
      <router-link :to="`/school/${this.$route.params['build']}`">{{ shortname }}</router-link>
    </h4>
    <button class="btn waves-effect waves-light" v-on:click="createBuilding">
      Создать новое здание
    </button>
    <div class="buildings" v-if="data.length">
      <h5>Существующие здания</h5>
      <ol>
        <router-link style="text-decoration: underline;" v-for="d in data" :key="d.id" tag="li" :to="`/building/${d.id}`">Адрес здания: {{ d.street }}, {{d.street_number}}
        </router-link>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolBuilding',
  data: () => ({
    shortname: '',
    data: []
  }),
  methods: {
    createBuilding() {
      this.$router.push(`/create_building/${this.$route.params['build']}`)
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const inn = this.$route.params['build']
    this.shortname = this.$store.getters.info['shortname']
    try {
      const resp = await this.$store.dispatch('fetchBuildings', {token, inn})
      this.data = resp.data.data[0]
      console.log(this.data)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>