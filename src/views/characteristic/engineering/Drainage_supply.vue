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
            <q-checkbox v-model="hasSystem" dense left-label
                        label="Наличие централизованной системы ливневой канализации на территории образовательного учреждения:"/>
          </div>

          <div class="input-field-roof-square" v-if="hasSystem">
            <label>Количество колодцев системы ливневой канализации на территории учреждения</label>
            <q-input outlined v-model="countSystem"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="hasRain" dense left-label
                        label="Наличие дождеприемника на территории учреждения:"/>
          </div>
          <div class="input-field-roof-square" v-if="hasRain">
            <label>Количество дождеприемников на территории учреждения</label>
            <q-input outlined v-model="countRain"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="hasSamotek" dense left-label
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
export default {
  name: "Drainage_supply",
  data: () => ({
    hasSystem: null,
    hasRain: null,
    hasSamotek: null,
    countRain: null,
    countSystem: null,
    loading: false,
  }),
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      console.log(this.status)
    }
  }
}
</script>

<style scoped>

</style>