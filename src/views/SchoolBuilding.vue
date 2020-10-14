<template>
  <div class="container">
    <h4>Здания учреждения </h4>

    <button class="btn waves-effect waves-light" v-on:click="createBuilding">
      Создать здание
    </button>
  </div>
</template>

<script>
export default {
  name: 'SchoolBuilding',
  methods: {
    createBuilding() {
      this.$router.push(`/create_building/${this.$route.params['build']}`)
    }
  }
}
</script>