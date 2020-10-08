<template>
  <div class="container">
    <h5>Ваши данные</h5>
    <p>
      <span>ИНН: {{ inn }}</span>
    </p>
    <p>
      <span>Район: {{ district }}</span>
    </p>
    <p>
      <span>Краткое наименование: {{ shortname }}</span>
    </p>
    <p>
      <span>Полное наименование: {{ fullname }}</span>
    </p>
    <p>
      <span>Телефон: {{ phone }}</span>
    </p>
    <p>
      <span>Адрес: {{ adress }}</span>
    </p>

  </div>
</template>

<script>
export default {
  name: 'school',
  data: () => ({
    inn: '',
    district: '',
    shortname: '',
    fullname: '',
    phone: '',
    adress: ''
  }),
  async mounted() {
    try {
      let info = this.$store.getters.info
      console.log(info)
      if (!Object.keys(info).length || info['INN'] !== localStorage.getItem('inn')) {
        await this.$store.dispatch('fetchInfo')
        console.log('dispatch')
      }
      info = this.$store.getters.info
      console.log('another')
      console.log(info)
      this.inn = info['INN']
      this.fullname = info['name']
      this.phone = info['phone']
      this.shortname = info['shortname']
      this.district = info['district']['name']
      this.adress = info['adress']
    } catch (e) {
      console.log(e)
    }
  }

}
</script>