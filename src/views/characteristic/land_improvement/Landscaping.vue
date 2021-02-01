<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Озеленение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-square">
            <label>Площадь зеленых насаждений, кв. м.</label>
            <q-input outlined type="number" hint="подсказка «Зелёные насажде́ния — совокупность древесных, кустарниковых и травянистых растений на определённой территории»" v-model.number="square"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество аварийных деревьев, согласно порубочного талона, шт</label>
            <q-input outlined type="number" v-model.number="count"/>
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
  name: "Landscaping",
  data: () => ({
    loading: false,
    square: null,
    count: null
  }),
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      console.log(this.window_status)
    }
  }
}
</script>

<style scoped>
.select {
  margin-bottom: 1px;
}
</style>