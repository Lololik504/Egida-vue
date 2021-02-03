<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Здания учреждения
        <router-link :to="`/schoolcard/${this.$route.params['build']}`">{{ shortname }}</router-link>
      </h4>
      <button class="btn waves-effect waves-light" @click="createBuilding">
        Создать новое здание
      </button>
      <div class="buildings" v-if="data">
        <h5>Существующие здания</h5>
        <ol>
          <li v-for="d in data"
              :key="d.id">
            <router-link
                :to="`/buildingcard/${d.id}`"
            >
              Адрес здания: {{ d.street }}, {{ d.street_number }}
            </router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SchoolBuilding',
  data: () => ({
    loading: true,
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
    try {
      const resp = await this.$store.dispatch('fetchBuildings', {token, inn})
      const info = await this.$store.dispatch('fetchInfo', {token, inn})
      this.shortname = info['shortname']
      this.data = resp.data.data[0]
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>