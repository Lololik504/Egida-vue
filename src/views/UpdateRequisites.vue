<template>
  <div class="container" style="width: 80%">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Редактирование реквизитов и адресов учреждения
        <router-link :to="`/school/${this.$route.params['inn']}`">{{ shortname }}</router-link>
      </h4>
      <form @submit.prevent="submitHandler">
        <div class="q-pa-sm">
          <div class="input-field-shortname">
            <label>Официальный сайт учреждения</label>
            <q-input outlined placeholder="Введите официальный сайт учреждения" type="url" v-model="$v.requisites.site.$model"
                     :class="{invalid: (!$v.requisites.site.url && $v.requisites.site.$dirty)}"
                     error-message="Введите корректный URL (формат: https://site.ru)"
                     :error="(!$v.requisites.site.url && $v.requisites.site.$dirty)"
                     hint="Формат: https://site.ru"
            />
          </div>
          <div class="row">
            <div class="col">
              <label>Юридический адрес учреждения (улица)</label>
              <q-input outlined placeholder="Введите улицу" v-model="requisites.street"/>
            </div>
            <div class="col">
              <label>Юридический адрес учреждения (номер дома)</label>
              <q-input outlined placeholder="Введите номер дома" v-model="requisites.street_number"/>
            </div>
          </div>
          <div class="select-district">
            <label>Территориальная принадлежность</label>
            <q-select outlined hint="Выберите район" v-model="requisites.district" :options="districts"/>
          </div>
          <div class="input-field-shortname">
            <label>Дата образования юр. лица</label>
            <q-input v-model="requisites.date" outlined type="date"/>
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
import {url} from 'vuelidate/lib/validators'
export default {
  name: "UpdateRequisites",
  data: () => ({
    shortname: null,
    loading: true,
    districts: [],
    requisites: {
      INN: null,
      street: null,
      street_number: null,
      district: null,
      site: null,
      date: null
    }
  }),
  validations: {
    requisites: {
      site: {
        url
      }
    }
  },
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['inn']
      info = await this.$store.dispatch('fetchInfo', {token, inn})
      const resp = await this.$store.dispatch('fetchDistricts')
      for (let key in resp) {
        this.districts.push(resp[key].name.name)
      }
      console.log(info)

      this.shortname = info['shortname']
      this.requisites.INN = info['INN']
      this.requisites.district = info['district']


      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async submitHandler() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        console.log('contact')
        console.log(this.requisites)
        // await this.$store.dispatch('updatePersonal', this.contactInfo)
        await this.$router.push(`/school/${this.requisites.INN}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>