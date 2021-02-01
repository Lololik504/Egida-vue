<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Система автоматического дымоудаление</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Наличие системы автоматического дымоудаления</label>
            <div class="select">
              <q-select outlined v-model="hasAPS" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined v-model="organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание системы автоматического дымоудаления в год, тыс.руб.</label>
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
  name: "Smoke_exhaust",
  data: () => ({
    loading: false,
    organization_name: null,
    hasAPS: null,
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