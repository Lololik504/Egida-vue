<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Озеленение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-square">
            <label>Площадь зеленых насаждений, кв. м.</label>
            <q-input outlined
                     :disable="disable"
                     type="number"
                     step="0.001"
                     hint="подсказка «Зелёные насажде́ния — совокупность древесных, кустарниковых и травянистых растений на определённой территории»"
                     v-model.number="green_area_square"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество аварийных деревьев, согласно порубочного талона, шт</label>
            <q-input outlined type="number" :disable="disable" v-model.number="emergency_trees_count"/>
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

export default {
  name: "Landscaping",
  data: () => ({
    loading: true,
    disable: true,
    green_area_square: null,
    emergency_trees_count: null
  }),
  methods: {
    async save() {
      try {
        const data = {
          green_area_square: this.green_area_square,
          emergency_trees_count: this.emergency_trees_count,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendLandImprovementInfo', data)
        if (resp['status'] === 200) {
          this.$showMessage('saveSuccess')
          this.disable = true
        }
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchLandImprovement', {token, id})
      this.emergency_trees_count = info['emergency_trees_count']
      this.green_area_square = info['green_area_square']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>