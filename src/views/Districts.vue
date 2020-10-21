<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Список учреждений</h4>
      <DistrictList
          :districts="districts"
      />
      <br/>
      <div class="btn-container">
        <button class="btn waves-effect waves-light" v-on:click="exportData">
          Экспорт данных
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";

export default {
  name: "Districts",
  components: {DistrictList},
  data: () => ({
    districts: [],
    loading: true,
    error: false
  }),
  methods: {
    async exportData() {
      try {
        await this.$store.dispatch('exportInfo')
      }catch (e) {
        console.log(e)
      }
    }
  },
  beforeCreate() {
    const per = localStorage.getItem('permission')
    console.log('checkPerm')
    if (!(per === '5' || per === '1' || per === '10')) {
      alert("У вас недостаточно прав!")
      this.$router.push('/')
    }
  },
  async mounted() {
    try {
      this.districts = await this.$store.dispatch('fetchDistricts')
      this.loading = false
    } catch (e) {
      console.log(e)
      this.error = true
    }
  }
}
</script>

<style scoped>

</style>