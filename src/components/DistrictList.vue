<template>
  <div>
    <ul>
      <li
          v-for="district in districts"
          :key="district.name['id']"
      >
        <q-expansion-item
            :label="district.name['name']"
        >
          <router-link
                       v-for="school in district['schools']"
                       :key="school['INN']"
                       :to="`/schoolcard/${school['INN']}`"
          >
            {{school['shortname']}}
            <br/>
          </router-link>
        </q-expansion-item>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    distrs: []
  }),
  props: {
    districts:{
      type: Array
    }
  },
  name: "DistrictList",
  created() {
    this.districts.forEach(dis => {
      this.distrs.push(dis.name['name'])
    })
    // console.log(this.distrs)
  }
}
</script>

<style scoped>
</style>