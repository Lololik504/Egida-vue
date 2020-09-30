<template>
  <div>
    <DistrictList v-bind:districts="districts"/>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";
export default {
  components: {DistrictList},
  data() {
    return {
      districts: []
    }
  },
  mounted() {
    fetch('http://192.168.0.2:8000/api/districts/')
        .then(response => response.json())
        .then(json => {
          this.districts = json['districts']
        })
  },
  name: "Districts"
}
</script>

<style scoped>

</style>