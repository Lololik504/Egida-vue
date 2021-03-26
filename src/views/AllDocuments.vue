<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Документация учреждений</h4>
      <DistrictList
          :districts="districts"
          url="documents"
      />
    </div>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";

export default {
  components: {DistrictList},
  name: "AllDocuments",
  data: () => ({
    districts: [],
    loading: true,
  }),
  async mounted() {
    try {
      this.districts = await this.$store.dispatch('fetchDistricts')
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>