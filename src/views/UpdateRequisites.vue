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
            <q-input outlined placeholder="Введите официальный сайт учреждения" type="url"
                     v-model="$v.requisites.official_site.$model"
                     :class="{invalid: (!$v.requisites.official_site.url && $v.requisites.official_site.$dirty)}"
                     error-message="Введите корректный URL (формат: https://site.ru)"
                     :error="(!$v.requisites.official_site.url && $v.requisites.official_site.$dirty)"
                     hint="Формат: https://site.ru"
            />
          </div>
          <div class="row">
            <div class="col">
              <label>Юридический адрес учреждения (улица)</label>
              <q-input outlined placeholder="Введите улицу" v-model="requisites.legal_address_street"/>
            </div>
            <div class="col">
              <label>Юридический адрес учреждения (номер дома)</label>
              <q-input outlined placeholder="Введите номер дома" v-model="requisites.legal_address_number"/>
            </div>
          </div>
          <div class="select-district">
            <label>Территориальная принадлежность</label>
            <q-select outlined hint="Выберите район" v-model="requisites.district" :options="districts"/>
          </div>
          <div class="input-field-date">
            <label>Дата образования юр. лица</label>
            <q-input v-model="requisites.formation_date" outlined type="date"/>
          </div>
        </div>
        <div class="q-gutter-md">
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <button class="btn waves-effect waves-light" @click="returnBack">
            Отменить
          </button>
        </div>
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
      legal_address_street: null,
      legal_address_number: null,
      district: null,
      official_site: null,
      formation_date: null
    }
  }),
  validations: {
    requisites: {
      official_site: {
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
      const resp = await this.$store.dispatch('fetchDistrictsQuery')
      const requisite = await this.$store.dispatch('fetchRequisites', inn)

      for (let key in resp) {
        this.districts.push(resp[key].attributes.name)
      }

      this.shortname = info['shortname']
      this.requisites.INN = info['INN']
      if (requisite.requisites.district) {
        this.requisites.district = requisite.requisites.district.name
      } else {
        this.requisites.district = null
      }
      this.requisites.formation_date = requisite.requisites['formation_date']
      this.requisites.official_site = requisite.requisites['official_site']
      this.requisites.legal_address_street = requisite.requisites['legal_address_street']
      this.requisites.legal_address_number = requisite.requisites['legal_address_number']


      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async returnBack() {
      await this.$router.push(`/school/${this.requisites.INN}`)
    },
    async submitHandler() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        await this.$store.dispatch('updateRequisites', this.requisites)
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