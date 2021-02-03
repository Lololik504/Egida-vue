<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Ограждение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-square">
            <label>Объем ограждения, м.пог.</label>
            <q-input outlined type="number" v-model.number="fence_volume"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние ограждения:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>% от общего асфальтового покрытия</label>
                    <q-input outlined type="number" v-model="fence_ok_volume"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>% от общего асфальтового покрытия</label>
                    <q-input outlined type="number" v-model="fence_warning_volume"/>
                  </div>
                </q-item><q-item class="column">
                <h6 class="col">Ограниченно работоспособное состояние</h6>
                <div class="input-field-roof-square col">
                  <label>% от общего асфальтового покрытия</label>
                  <q-input outlined type="number" v-model="fence_emergency_volume"/>
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
  name: "Fencing",
  data: () => ({
    loading: true,
    fence_volume: null,
    fence_ok_volume: null,
    fence_warning_volume: null,
    fence_emergency_volume: null
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
          fence_volume: this.fence_volume,
          fence_ok_volume: this.fence_ok_volume,
          fence_warning_volume: this.fence_warning_volume,
          fence_emergency_volume: this.fence_emergency_volume,
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
      this.fence_emergency_volume = info['fence_emergency_volume']
      this.fence_warning_volume = info['fence_warning_volume']
      this.fence_ok_volume = info['fence_ok_volume']
      this.fence_volume = info['fence_volume']
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