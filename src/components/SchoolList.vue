<template>
  <div>
    <ul>
      <SchoolListItem
          v-for="school in schools"
          :school="school" :key="school.id" :counter="count+=1"
      />
    </ul>
  </div>
</template>

<script>
import SchoolListItem from "@/components/SchoolListItem";

export default {
  data(){
    return{
      count: 0
    }
  },
  name: "SchoolsList",
  components: {SchoolListItem},
  props: ['schools']
}
</script>

<style scoped>
ul{
  width: 300px;
}
</style>