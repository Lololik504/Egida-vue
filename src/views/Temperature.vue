<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4> Температурный режим здания
        <router-link :to="`/buildingcard/${this.$route.params['id']}`"> {{
            street + ', ' + street_number
          }}
        </router-link>
      </h4>
      <div class="q-gutter-md">
        <button class="btn waves-effect waves-light" v-on:click="promptAdd = true">
          Добавить сведения
        </button>
        <button v-if="data.length" class="btn waves-effect waves-light" v-on:click="promptUpdate = true">
          Изменить сведения
        </button>
        <button v-if="data.length" class="btn waves-effect waves-light" v-on:click="promptDelete = true">
          Удалить сведения
        </button>
      </div>
      <q-dialog v-model="promptAdd" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Температурный режим</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input v-model="date" filled type="date" hint="Дата" autofocus
                     :class="{invalid: date > new Date().toISOString().substr(0,10)}"
                     :error-message="date > new Date().toISOString().substr(0,10) ? 'Некорректная дата!': ''"
                     :error="(date > new Date().toISOString().substr(0,10))"/>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model="temp"
                hint="Температура теплоносителя"
                reverse-fill-mask
                mask="##.#"
                suffix="℃"
                :class="{invalid: (!$v.temp.required && $v.temp.$dirty)}"
                :error-message="!$v.temp.required && $v.temp.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.temp.required && $v.temp.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model="tempAir"
                hint="Температура воздуха"
                reverse-fill-mask
                mask="##.#"
                suffix="℃"
                :class="{invalid: (!$v.tempAir.required && $v.tempAir.$dirty)}"
                :error-message="!$v.tempAir.required && $v.tempAir.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempAir.required && $v.tempAir.$dirty)"
            />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Добавить" v-close-popup @click.prevent="addTemperature"/>
            <q-btn flat label="Отменить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="promptUpdate" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Температурный режим</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-select v-model="date" filled type="date" hint="Дата" autofocus :options="dates" style="max-height: 90px"/>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model="temp"
                hint="Температура теплоносителя"
                reverse-fill-mask
                mask="##.#"
                suffix="℃"
                :class="{invalid: (!$v.temp.required && $v.temp.$dirty)}"
                :error-message="!$v.temp.required && $v.temp.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.temp.required && $v.temp.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model="tempAir"
                hint="Температура воздуха"
                reverse-fill-mask
                mask="##.#"
                suffix="℃"
                :class="{invalid: (!$v.tempAir.required && $v.tempAir.$dirty)}"
                :error-message="!$v.tempAir.required && $v.tempAir.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempAir.required && $v.tempAir.$dirty)"
            />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Изменить" v-close-popup @click.prevent="updateTemperature"/>
            <q-btn flat label="Отменить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="promptDelete" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Температурный режим</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input v-model="date" filled type="date" hint="Дата" autofocus
                     :class="{invalid: date > new Date().toISOString().substr(0,10)}"
                     :error-message="date > new Date().toISOString().substr(0,10) ? 'Некорректная дата!': ''"
                     :error="(date > new Date().toISOString().substr(0,10))"/>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Удалить" v-close-popup @click.prevent="deleteTemperature"/>
            <q-btn flat label="Отменить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="q-pa-md" v-if="data.length" v-bind="data">
        <q-table class="my-sticky-column-table"
                 :data="data"
                 :columns="columns"
                 separator="cell"
                 row-key="name"
                 :rows-per-page-options="[]"
        >
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: "Temperature",
  data: () => ({
    loading: true,
    street: '',
    street_number: '',
    permission: localStorage.getItem('permission') <= 10,
    promptAdd: false,
    promptDelete: false,
    promptUpdate: false,
    dates: [],
    date: '',
    temp: '',
    tempAir: '',
    data: [],
    columns: [
      {
        name: 'date', align: 'center', label: 'Дата', field: 'date', classes: 'bg-grey-2 ellipsis',
        style: 'max-width: 100px',
        headerClasses: 'bg-primary text-white',
        sortable: true
      },
      {name: 'coolant_temperature', align: 'center', label: 'Температура теплоносителя (℃)', field: 'coolant_temperature', sortable: true},
      {name: 'air_temperature', align: 'center', label: 'Температура воздуха (℃)', field: 'air_temperature', sortable: true}
    ]
  }),
  validations: {
    date: required,
    temp: required,
    tempAir: required
  },
  methods: {
    mainInfo() {
      this.$router.push(`/building/${this.$route.params['card']}`)
    },
    async addTemperature() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const data = {
        building: this.$route.params['id'],
        coolant_temperature: this.temp,
        air_temperature: this.tempAir,
        date: this.date
      }
      try {
        await this.$store.dispatch('addTemperature', data)
        const temper = await this.$store.dispatch('fetchTemperatures', localStorage.getItem('currentINN'))
        this.data = temper[this.$route.params['id']];
      } catch (e) {
        console.log(e)
      }
    },
    async deleteTemperature() {
      const data = {
        building: this.$route.params['id'],
        date: this.date
      }
      try {
        await this.$store.dispatch('deleteTemperature', data)
        const temper = await this.$store.dispatch('fetchTemperatures', localStorage.getItem('currentINN'))
        this.data = temper[this.$route.params['id']];
      } catch (e) {
        console.log(e)
      }
    },
    async updateTemperature() {
      const obj = this.data.find(id => id.date === this.date)
      const data = {
        building: this.$route.params['id'],
        id: obj.id,
        coolant_temperature: this.temp,
        air_temperature: this.tempAir,
        date: this.date
      }
      try {
        await this.$store.dispatch('updateTemperature', data)
        const temper = await this.$store.dispatch('fetchTemperatures', localStorage.getItem('currentINN'))
        this.data = temper[this.$route.params['id']];
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const resp = await this.$store.dispatch('fetchBuilding', {token, id})
      const temper = await this.$store.dispatch('fetchTemperatures', localStorage.getItem('currentINN'))
      this.data = temper[id];
      this.dates = this.data.map(obj => obj.date)
      console.log(this.data)
      console.log(this.dates)
      this.street = resp['street']
      this.street_number = resp['street_number']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>


<style lang="sass">
.my-sticky-column-table
  max-width: 900px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>