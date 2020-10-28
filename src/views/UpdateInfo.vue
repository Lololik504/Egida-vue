<template>
  <div class="container" style="width: 80%">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Редактирование основных сведений учреждения
        <router-link :to="`/school/${this.$route.params['inn']}`">{{ mainInfo.shortname }}</router-link>
      </h4>
      <form @submit.prevent="submitHandler">
        <div class="q-pa-sm">
          <div class="input-field-shortname">
            <label>Краткое название</label>
            <q-input outlined placeholder="Введите краткое название" v-model="mainInfo.shortname"/>
          </div>
          <div class="input-field-fullname">
            <label>Полное название</label>
            <q-input outlined placeholder="Введите полное название" v-model="mainInfo.name"/>
          </div>
          <div class="select-type-field">
            <label>Вид организационно-правовой форм</label>
            <q-select outlined v-model="mainInfo.form_type" :options="form_types"/>
          </div>
          <div class="select-type-field">
            <label>Вид образования</label>
            <q-select outlined v-model="mainInfo.edu_type" :options="edu_types"/>
          </div>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateInfo",
  data: () => ({
    form_types: ['МКУ - муниципальное казенное учреждение',
      'МАУ - муниципальное автономное учреждение',
      'МБУ - муниципальное бюджетное учреждение',
      'МБОУ - муниципальное бюджетное общеобразовательное учреждение',
      'МКОУ - муниципальное казенное общеобразовательное учреждение',
      'МАОУ - муниципальное автономное общеобразовательное учреждение',
      'МКДОУ - муниципальное казенное дошкольное образовательное учреждение',
      'МАДОУ - муниципальное автономное дошкольное образовательное учреждение',
      'МБДОУ - муниципальное бюджетное дошкольное образовательное учреждение'],
    edu_types: ['Гимназия - гимназия',
      'Прогимназия - прогимназия',
      'Лицей - лицей',
      'СОШ – средняя общеобразовательная школа',
      'ООШ – основная общеобразовательная школа',
      'ШИ – школа-интернат',
      'В(С)Ш - вечерняя (сменная) школа',
      'С(К)Ш - специальная (коррекционная) школа',
      'С(К)ШИ - специальная (коррекционная) школа-интернат',
      'С(К)НШ - специальная (коррекционная) начальная школа',
      'д/с – детский сад',
      'ДО – дополнительное образование',
      'ДПО – дополнительное профессиональное образование]'],
    loading: true,
    mainInfo: {
      INN: null,
      form_type: null,
      edu_type: null,
      shortname: null,
      name: null,
    }
  }),
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['inn']
      info = await this.$store.dispatch('fetchInfo', {token, inn})


      this.mainInfo.INN = info['INN']
      this.mainInfo.name = info['name']
      this.mainInfo.edu_type = info['edu_type']
      this.mainInfo.form_type = info['form_type']
      this.mainInfo.shortname = info['shortname']


      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async submitHandler() {
      try {
        if (this.mainInfo.edu_type.length > 10) {
          this.mainInfo.edu_type = this.mainInfo.edu_type.slice(0, this.mainInfo.edu_type.indexOf(' '))
        }
        if (this.mainInfo.form_type.length > 10) {
          this.mainInfo.form_type = this.mainInfo.form_type.slice(0, this.mainInfo.form_type.indexOf(' '))
        }
        console.log(this.mainInfo)
        await this.$store.dispatch('updateInfo', this.mainInfo)
        await this.$router.push(`/school/${this.mainInfo.INN}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>