<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong> Система водоотведения поверхностных сточных вод</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="checkbox">
            <q-checkbox v-model="data.centralized_storm_sewer_system" :disable="disable" dense left-label
                        label="Наличие централизованной системы ливневой канализации на территории образовательного учреждения:"/>
          </div>

          <div class="input-field-roof-square" v-if="data.centralized_storm_sewer_system">
            <label>Количество колодцев системы ливневой канализации на территории учреждения</label>
            <q-input outlined type="number" v-model.number="data.the_number_of_wells_of_the_storm_sewer_system" :disable="disable"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.storm_water_inlet" dense :disable="disable" left-label
                        label="Наличие дождеприемника на территории учреждения:"/>
          </div>
          <div class="input-field-roof-square" v-if="data.storm_water_inlet">
            <label>Количество дождеприемников на территории учреждения</label>
            <q-input outlined type="number" v-model.number="data.number_of_storm_water_inlets" :disable="disable"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.water_occurs_onto_low_relief" :disable="disable" dense left-label
                        label="Слив дождевой и талой воды происходит самотеком на пониженный рельеф местности:"/>
          </div>
          <button class="btn waves-effect waves" @click.prevent="disable = false" v-if="disable">
            Редактирование
          </button>
          <div class="q-gutter-sm" v-else>
            <button class="btn waves-effect waves-light" type="submit">
              Сохранить
            </button>
            <button class="btn waves-effect waves" @click.prevent="disable = true">
              Отменить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "Drainage_supply",
  data: () => ({
    disable: true,
    data: {
      id: null,
      centralized_storm_sewer_system: null,
      storm_water_inlet: null,
      water_occurs_onto_low_relief: null,
      number_of_storm_water_inlets: null,
      the_number_of_wells_of_the_storm_sewer_system: null
    },
    loading: true,
  }),
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      try {
        const resp = await this.$store.dispatch('sendEngineeringInfo', this.data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
        }
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    },
    showMessage(text) {
      if (messages[text]) {
        window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchEngineering', {token, id})
      Object.assign(this.data, info)
      this.data['id'] = id
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>