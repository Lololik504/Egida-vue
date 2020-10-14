<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Список учреждений</h4>
      <DistrictList
          :districts="districts"
      />
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
    loading: true
  }),
  async mounted() {
    try {
      this.districts = await this.$store.dispatch('fetchDistricts')
      console.log(this.districts)
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>