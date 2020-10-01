<template>
  <div>
    <ul>
      <DistrictListItem
          v-for="district in districts"
          :district="district" :key="district.id" :counter="count+=1"
      />
    </ul>
  </div>
</template>

<script>
import DistrictListItem from "@/components/DistrictListItem";

export default {
  data(){
    return{
      count: 0
    }
  },
  name: "DistrictList",
  components: {DistrictListItem},
  props: ['districts']
}
</script>

<style scoped>
ul{
  width: 300px;
}
</style>