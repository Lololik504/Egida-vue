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
                     type="number"
                     hint="подсказка «Зелёные насажде́ния — совокупность древесных, кустарниковых и травянистых растений на определённой территории»"
                     v-model.number="green_area_square"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество аварийных деревьев, согласно порубочного талона, шт</label>
            <q-input outlined type="number" v-model.number="emergency_trees_count"/>
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
  name: "Landscaping",
  data: () => ({
    loading: true,
    green_area_square: null,
    emergency_trees_count: null
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
          green_area_square: this.green_area_square,
          emergency_trees_count: this.emergency_trees_count,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendLandImprovementInfo', data)
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
        window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    }
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
.select {
  margin-bottom: 1px;
}
</style>