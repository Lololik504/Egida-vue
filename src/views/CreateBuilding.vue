<template>
  <div class="container">
    <h4>Добавление здания</h4>
    <form>
      <div class="input-field">
        <p>Адрес</p>
        <textarea rows="10" cols="45" name="text"></textarea>
      </div>
      <div class="input-field">
        <p>Вид здания</p>
        <select>
          <option>

          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateBuilding'
  // async mounted() {
  //   const token = localStorage.getItem('token')
  //   const inn = this.$route.params['build']
  //   try {
  //     const resp = await this.$store.dispatch('fetchBuilding',{token, inn})
  //     // console.log('build')
  //     // console.log(resp)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
</script>