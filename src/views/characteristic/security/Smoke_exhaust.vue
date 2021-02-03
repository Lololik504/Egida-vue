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
                        v-model="automatic_smoke_exhaust"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined v-model="ASE_service_organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание системы автоматического дымоудаления в год, тыс.руб.</label>
            <q-input outlined type="number" v-model.number="price_for_ASE_per_year"/>
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
  name: "Smoke_exhaust",
  data: () => ({
    loading: true,
    ASE_service_organization_name: null,
    automatic_smoke_exhaust: null,
    price_for_ASE_per_year: null
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
          ASE_service_organization_name: this.ASE_service_organization_name,
          automatic_smoke_exhaust: this.automatic_smoke_exhaust,
          price_for_ASE_per_year: this.price_for_ASE_per_year,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendSecurityInfo', data)
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
      const info = await this.$store.dispatch('fetchSecurity', {token, id})
      this.ASE_service_organization_name = info['ASE_service_organization_name']
      this.automatic_smoke_exhaust = info['automatic_smoke_exhaust']
      this.price_for_ASE_per_year = info['price_for_ASE_per_year']
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