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
              <q-select outlined
                        :disable="disable"
                        v-model="data.automatic_smoke_exhaust"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined :disable="disable" v-model="data.ASE_service_organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание системы автоматического дымоудаления в год, тыс.руб.</label>
            <q-input outlined :disable="disable" type="number" v-model.number="data.price_for_ASE_per_year"/>
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
  name: "Smoke_exhaust",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      id: null,
      ASE_service_organization_name: null,
      automatic_smoke_exhaust: null,
      price_for_ASE_per_year: null
    }
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
        const resp = await this.$store.dispatch('sendSecurityInfo', this.data)
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
      const info = await this.$store.dispatch('fetchSecurity', {token, id})
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
.select {
  margin-bottom: 1px;
}
</style>