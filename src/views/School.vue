<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else class="card">
      <h5>Учереждение
        <router-link :to="`/schoolcard/${this.$route.params['school']}`"> {{ shortname }}</router-link>
      </h5>

      <p>ИНН:
        <span>{{ INN }}</span>
      </p>
      <p>
        Район:
        <span v-on:click="changeData">{{ district }}</span>
      </p>
      <p>
        Краткое наименование:
        <span v-on:click="changeData">{{ shortname }}</span>
      </p>
      <p>
        Полное наименование:
        <span v-on:click="changeData">{{ fullname }}</span>
      </p>
      <p>
        Телефон:
        <span v-on:click="changeData">{{ phone }}</span>
      </p>
      <p>
        Адрес:
        <span v-on:click="changeData">{{ address }}</span>
      </p>
    </div>
    <button class="btn waves-effect waves-light" v-on:click="building">
      Здания
    </button>
  </div>

</template>

<script>
export default {
  name: 'school',
  data: () => ({
    INN: '',
    district: '',
    shortname: '',
    fullname: '',
    phone: '',
    address: '',
    loading: true
  }),
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['school']
      if (!Object.keys(info).length || info['INN'] !== inn) {
        info = await this.$store.dispatch('fetchInfo', {token, inn})
      }
      this.loading = false
      this.INN = info['INN']
      this.fullname = info['name']
      this.phone = info['phone']
      this.shortname = info['shortname']
      this.district = info['district']['name']
      this.address = info['address']
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async changeData(value) {
      const newData = prompt("Введите новые данные:", value.toElement['textContent'])
      const val = Object.values(this.$data)
      const keys = Object.keys(this.$data)
      var tmp = ''
      for (let k in val) {
        if (val[k] === value.toElement['textContent']) {
          tmp = keys[k]
        }
      }
      if (newData != null && newData !== '') {
        this.$data[tmp] = newData
        await this.$store.dispatch('updateInfo', this.$data)
      }

    },
    building() {
      this.$router.push(`/schoolbuilding/${this.$route.params['school']}`)
    }
  }

}
</script>