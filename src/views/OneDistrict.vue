<template>
  <div>
    <h2>District {{district}}</h2>
    <SchoolList v-bind:schools="schools"/>
  </div>
</template>

<script>
import SchoolList from "@/components/SchoolList";
export default {
name: "OneDistrict",
  components: {SchoolList},
  data() {
    return {
      schools: []
    }
  },
  mounted() {
    fetch('http://192.168.0.2:8000/api/districts/'+this.district)
        .then(response => response.json())
        .then(json => {
          this.schools = json['schools']
        })
  },
  props: ['district']
}
</script>

<style scoped>

</style>