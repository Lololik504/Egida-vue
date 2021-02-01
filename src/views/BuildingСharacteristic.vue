<template>
  <Loader v-if="loading"/>
  <div v-else>
    <h4 class="center">
      Характеристика здания
      <router-link :to="`/buildingcard/${this.$route.params['id']}`"> {{
          street + ', ' + street_number
        }}
      </router-link>
    </h4>
    <div class="flex">
      <Sidebar :purpose="purpose"/>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "BuildingСharacteristic",
  components: {Sidebar},
  data: () => ({
    loading: true,
    street: '',
    street_number: '',
    permission: localStorage.getItem('permission') <= 10,
    purpose: null
  }),
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const resp = await this.$store.dispatch('fetchBuilding', {token, id})
      this.purpose = resp['purpose']
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
.flex {
  flex-wrap: nowrap;
}
.main {
  width: 80%;
}
</style>