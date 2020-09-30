<template>
  <div>
    <ul>
      <DistrictListItem
          v-for="district in districts"
          :district="district" :key="district.id"
      />
    </ul>
  </div>
</template>

<script>
import DistrictListItem from "@/components/DistrictListItem";

export default {
  name: "DistrictList",
  components: {DistrictListItem},
  props: ['districts']
}
</script>

<style scoped>

</style>