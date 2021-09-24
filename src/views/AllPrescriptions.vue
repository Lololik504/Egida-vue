<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Предписания учреждений</h4>
      <DistrictList
          :districts="districts"
          url="prescriptions"
      />
    </div>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";

export default {
  components: {DistrictList},
  name: "AllPrescriptions",
  data: () => ({
    districts: [],
    loading: true,
  }),
  async mounted() {
    try {
      this.districts = await this.$store.dispatch('fetchDistricts')
      this.loading = false
    } catch (e) {
      await this.$router.push('*')
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>