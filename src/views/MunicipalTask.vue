<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Муниципальное задание на содержание здания
        <router-link :to="`/schoolcard/${this.$route.params['id']}`">{{ shortname }}</router-link>
      </h4>

      <div class="buildings" v-if="data.length">
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
  name: "MunicipalTask",
  data: () => ({
    loading: true,
    shortname: null,
    data: [],
    options: []
  }),
  async mounted() {
    const token = localStorage.getItem('token')
    const inn = this.$route.params['id']
    try {
      const resp = await this.$store.dispatch('fetchBuildings', {token, inn})
      const info = await this.$store.dispatch('fetchInfo', {token, inn})
      this.shortname = info['shortname']
      this.data = resp.data.data[0]
      for (let item in this.data) {
        console.log(item)
      }
      console.log(this.data)
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>