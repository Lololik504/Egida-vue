<template>
  <li>
    <router-link :to="district.name">{{district.name}}</router-link>
  </li>
</template>

<script>
export default {
  name: "DistrictListItem",
  props: {
    district: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>