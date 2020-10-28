<template>
  <div class="container">
    <h5>Добавить учреждение</h5>
    <div class="q-pa-md">
      <div class="input-field-inn">
        <label>ИНН учреждения</label>
        <q-input outlined placeholder="Введите ИНН" v-model.number="INN"/>
      </div>
      <div class="input-field-shortname">
        <label>Краткое наименование</label>
        <q-input outlined placeholder="Введите краткое наименование" v-model="shortname"/>
      </div>
      <div class="select-district">
        <label>Район</label>
        <q-select outlined hint="Выберите район" v-model="district" :options="districts"/>
      </div>
      <button class="btn waves-effect waves-light" @click.prevent="clickHandler">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateSchool",
  data: () => ({
    INN: null,
    shortname: null,
    district: null,
    districts: []
  }),
  async mounted() {
    try {
      const resp = await this.$store.dispatch('fetchDistricts')
      for (let key in resp) {
        this.districts.push(resp[key].name.name)
      }
      console.log(this.districts)
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async clickHandler() {
      try {
        const dataForm = {
          INN: this.INN,
          shortname: this.shortname,
          district: this.district
        }
        console.log(dataForm)
        if (dataForm.district && dataForm.shortname && dataForm.INN) {
          await this.$store.dispatch('createSchool', dataForm)
          await this.$router.push('/districts')
        } else {
          alert('Введите все поля!')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>