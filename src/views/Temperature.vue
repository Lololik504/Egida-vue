<template>
  <Loader class="container" v-if="loading"/>
  <div v-else>
    <div class="container">
      <h4> Температурный режим здания
        <router-link :to="`/buildingcard/${this.$route.params['id']}`"> {{
            street + ', ' + street_number
          }}
        </router-link>
      </h4>
      <div class="q-gutter-md">
        <button class="btn waves-effect waves-light" @click="promptAddHandler">
          Добавить сведения
        </button>
        <button v-if="data.length" class="btn waves-effect waves-light" @click="promptUpdateHandler">
          Изменить сведения
        </button>
        <button v-if="data.length && localStorage.getItem('permission') < 15" class="btn waves-effect waves-light" @click="promptDeleteHandler">
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
                v-model.number="tempIn"
                hint="Температура подающего трубопровода"
                type="number"
                suffix="℃"
                :class="{invalid: (!$v.tempIn.required && $v.tempIn.$dirty)}"
                :error-message="!$v.tempIn.required && $v.tempIn.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempIn.required && $v.tempIn.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="tempOut"
                hint="Температура обратного трубопровода"
                type="number"
                suffix="℃"
                :class="{invalid: (!$v.tempOut.required && $v.tempOut.$dirty)}"
                :error-message="!$v.tempOut.required && $v.tempOut.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempOut.required && $v.tempOut.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="pressIn"
                hint="Давление на подающем трубопроводе"
                type="number"
                suffix="кгс/см2"
                :class="{invalid: (!$v.pressIn.required && $v.pressIn.$dirty)}"
                :error-message="!$v.pressIn.required && $v.pressIn.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.pressIn.required && $v.pressIn.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="pressOut"
                hint="Давление на обратном трубопроводе"
                type="number"
                suffix="кгс/см2"
                :class="{invalid: (!$v.pressOut.required && $v.pressOut.$dirty)}"
                :error-message="!$v.pressOut.required && $v.pressOut.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.pressOut.required && $v.pressOut.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="tempAir"
                hint="Минимальная температура воздуха внутри помещения"
                type="number"
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
            <q-select v-model="date" filled type="date" hint="Дата" autofocus :options="dates"
                      style="max-height: 90px"/>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="tempIn"
                hint="Температура подающего трубопровода"
                type="number"
                suffix="℃"
                :class="{invalid: (!$v.tempIn.required && $v.tempIn.$dirty)}"
                :error-message="!$v.tempIn.required && $v.tempIn.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempIn.required && $v.tempIn.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="tempOut"
                hint="Температура обратного трубопровода"
                type="number"
                suffix="℃"
                :class="{invalid: (!$v.tempOut.required && $v.tempOut.$dirty)}"
                :error-message="!$v.tempOut.required && $v.tempOut.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.tempOut.required && $v.tempOut.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="pressIn"
                hint="Давление на подающем трубопроводе"
                type="number"
                suffix="кгс/см2"
                :class="{invalid: (!$v.pressIn.required && $v.pressIn.$dirty)}"
                :error-message="!$v.pressIn.required && $v.pressIn.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.pressIn.required && $v.pressIn.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="pressOut"
                hint="Давление на обратном трубопроводе"
                type="number"
                suffix="кгс/см2"
                :class="{invalid: (!$v.pressOut.required && $v.pressOut.$dirty)}"
                :error-message="!$v.pressOut.required && $v.pressOut.$dirty ? 'Поле не должно быть пустым': ''"
                :error="(!$v.pressOut.required && $v.pressOut.$dirty)"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
                filled
                v-model.number="tempAir"
                hint="Минимальная температура воздуха внутри помещения"
                type="number"
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
            <q-select v-model="date" filled type="date" hint="Дата" autofocus :options="dates"
                      style="max-height: 90px"/>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Удалить" v-close-popup @click.prevent="deleteTemperature"/>
            <q-btn flat label="Отменить" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="q-pa-sm" v-if="data.length" v-bind="data">
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
    tempIn: '',
    tempOut: '',
    pressOut: '',
    pressIn: '',
    tempAir: '',
    data: [],
    columns: [
      {
        name: 'date', align: 'center', label: 'Дата', field: 'date', classes: 'bg-grey-2 ellipsis',
        style: 'max-width: 100px',
        headerClasses: 'bg-primary text-white',
        sortable: true
      },
      {
        name: 'coolant_forward_temperature',
        align: 'center',
        label: 'Температура подающего трубопровода (℃)',
        field: 'coolant_forward_temperature',
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: 'coolant_backward_temperature',
        align: 'center',
        label: 'Температура обратного трубопровода (℃)',
        field: 'coolant_backward_temperature',
        sortable: true
      },
      {
        name: 'forward_pressure',
        align: 'center',
        label: 'Давление на подающем трубопроводе (кгс/см2)',
        field: 'forward_pressure',
        sortable: true
      },
      {
        name: 'backward_pressure',
        align: 'center',
        label: 'Давление на обратном трубопроводе (кгс/см2)',
        field: 'backward_pressure',
        sortable: true
      },
      {
        name: 'air_temperature',
        align: 'center',
        label: 'Температура воздуха (℃)',
        field: 'air_temperature',
        sortable: true
      }
    ]
  }),
  validations: {
    date: required,
    tempIn: required,
    tempOut: required,
    pressOut: required,
    pressIn: required,
    tempAir: required
  },
  methods: {
    promptAddHandler() {
      this.date = new Date().toISOString().substr(0, 10)
      this.promptAdd = true
    },
    promptUpdateHandler() {
      this.date = this.dates[0]
      this.promptUpdate = true
    },
    promptDeleteHandler() {
      this.date = this.dates[0]
      this.promptDelete = true
    },
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
        coolant_forward_temperature: this.tempIn.toFixed(1),
        coolant_backward_temperature: this.tempOut.toFixed(1),
        forward_pressure: this.pressIn.toFixed(1),
        backward_pressure: this.pressOut.toFixed(1),
        air_temperature: this.tempAir.toFixed(1),
        date: this.date
      }
      try {
        await this.$store.dispatch('addTemperature', data)
        await this.refreshDates()
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
        await this.refreshDates()
      } catch (e) {
        console.log(e)
      }
    },
    async updateTemperature() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const obj = this.data.find(id => id.date === this.date)
      const data = {
        id: obj.id,
        building: this.$route.params['id'],
        coolant_forward_temperature: this.tempIn.toFixed(1),
        coolant_backward_temperature: this.tempOut.toFixed(1),
        forward_pressure: this.pressIn.toFixed(1),
        backward_pressure: this.pressOut.toFixed(1),
        air_temperature: this.tempAir.toFixed(1),
        date: this.date
      }
      try {
        await this.$store.dispatch('updateTemperature', data)
        await this.refreshDates()
      } catch (e) {
        console.log(e)
      }
    },
    async refreshDates() {
      try {
        const id = this.$route.params['id']
        const temper = await this.$store.dispatch('fetchTemperatures', localStorage.getItem('currentINN'))
        this.data = temper[id];
        this.dates = this.data.map(obj => obj.date)
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
      await this.refreshDates()
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
  margin-top: 10px
  max-width: 100%
  table-layout: fixed

  thead th
    width: 100px
    white-space: normal

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