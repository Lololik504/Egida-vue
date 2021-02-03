<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Асфальтовое покрытие</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-square">
            <label>Площадь асфальтового покрытия, кв. м.</label>
            <q-input outlined type="number" v-model.number="asphalt_area"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние асфальтового покрытия:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                    <h6 class="col">Работоспособное состояние</h6>
                    <div class="input-field-roof-square col">
                      <label>% от общего асфальтового покрытия</label>
                      <q-input outlined type="number" v-model="asphalt_ok_percent"/>
                    </div>
                </q-item>
                <q-item class="column">
                    <h6 class="col">Ограниченно работоспособное состояние</h6>
                    <div class="input-field-roof-square col">
                      <label>% от общего асфальтового покрытия</label>
                      <q-input outlined type="number" v-model="asphalt_warning_percent"/>
                    </div>
                </q-item><q-item class="column">
                    <h6 class="col">Ограниченно работоспособное состояние</h6>
                    <div class="input-field-roof-square col">
                      <label>% от общего асфальтового покрытия</label>
                      <q-input outlined type="number" v-model="asphalt_emergency_percent"/>
                    </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
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
  name: "Asphalt",
  data: () => ({
    loading: true,
    asphalt_area: null,
    asphalt_ok_percent: null,
    asphalt_warning_percent: null,
    asphalt_emergency_percent: null,
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
          asphalt_area: this.asphalt_area,
          asphalt_ok_percent: this.asphalt_ok_percent,
          asphalt_warning_percent: this.asphalt_warning_percent,
          asphalt_emergency_percent: this.asphalt_emergency_percent,
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
      this.asphalt_emergency_percent = info['asphalt_emergency_percent']
      this.asphalt_warning_percent = info['asphalt_warning_percent']
      this.asphalt_ok_percent = info['asphalt_ok_percent']
      this.asphalt_area = info['asphalt_area']
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