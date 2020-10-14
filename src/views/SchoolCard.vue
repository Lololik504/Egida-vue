<template>
  <div class="container">
    <h4> Карточка учреждения</h4>
    <button class="btn waves-effect waves-light" v-on:click="mainInfo">
      Основные сведения
    </button>
    <br/>
    <br/>
    <button class="btn waves-effect waves-light" v-on:click="building">
      Здания
    </button>
  </div>
</template>

<script>
export default {
  name: 'SchoolCard',
  methods: {
    mainInfo() {
      this.$router.push(`/school/${this.$route.params['card']}`)
    },
    building() {
      this.$router.push(`/schoolbuilding/${this.$route.params['card']}`)
    }
  }
}
</script>