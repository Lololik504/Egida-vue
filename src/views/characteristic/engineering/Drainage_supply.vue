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
            <q-checkbox v-model="centralized_storm_sewer_system" dense left-label
                        label="Наличие централизованной системы ливневой канализации на территории образовательного учреждения:"/>
          </div>

          <div class="input-field-roof-square" v-if="centralized_storm_sewer_system">
            <label>Количество колодцев системы ливневой канализации на территории учреждения</label>
            <q-input outlined v-model="the_number_of_wells_of_the_storm_sewer_system"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="storm_water_inlet" dense left-label
                        label="Наличие дождеприемника на территории учреждения:"/>
          </div>
          <div class="input-field-roof-square" v-if="storm_water_inlet">
            <label>Количество дождеприемников на территории учреждения</label>
            <q-input outlined v-model="number_of_storm_water_inlets"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="water_occurs_onto_low_relief" dense left-label
                        label="Слив дождевой и талой воды происходит самотеком на пониженный рельеф местности:"/>
          </div>
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
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
    centralized_storm_sewer_system: null,
    storm_water_inlet: null,
    water_occurs_onto_low_relief: null,
    number_of_storm_water_inlets: null,
    the_number_of_wells_of_the_storm_sewer_system: null,
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
        const data = {
          centralized_storm_sewer_system: this.centralized_storm_sewer_system,
          storm_water_inlet: this.storm_water_inlet,
          water_occurs_onto_low_relief: this.water_occurs_onto_low_relief,
          number_of_storm_water_inlets: this.number_of_storm_water_inlets,
          the_number_of_wells_of_the_storm_sewer_system: this.the_number_of_wells_of_the_storm_sewer_system,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendEngineeringInfo', data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
        }
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    },
    showMessage(text) {
      if (messages[text]) {
        window.scrollTo(0,0)
        this.$message(messages[text])
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchEngineering', {token, id})
      this.centralized_storm_sewer_system = info['centralized_storm_sewer_system']
      this.storm_water_inlet = info['storm_water_inlet']
      this.water_occurs_onto_low_relief = info['water_occurs_onto_low_relief']
      this.number_of_storm_water_inlets = info['number_of_storm_water_inlets']
      this.the_number_of_wells_of_the_storm_sewer_system = info['the_number_of_wells_of_the_storm_sewer_system']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>