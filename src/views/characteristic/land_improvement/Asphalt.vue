<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Асфальтовое покрытие</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-square">
            <label>Площадь асфальтового покрытия, кв. м.</label>
            <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="data.asphalt_area"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние асфальтового покрытия:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>% от общего асфальтового покрытия</label>
                    <q-input outlined :disable="disable" step="0.001" type="number" v-model="data.asphalt_ok_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>% от общего асфальтового покрытия</label>
                    <q-input outlined :disable="disable" step="0.001" type="number"
                             v-model="data.asphalt_warning_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>% от общего асфальтового покрытия</label>
                    <q-input outlined :disable="disable" step="0.001" type="number"
                             v-model="data.asphalt_emergency_percent"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
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
  name: "Asphalt",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      id: null,
      asphalt_area: null,
      asphalt_ok_percent: null,
      asphalt_warning_percent: null,
      asphalt_emergency_percent: null
    }
  }),
  methods: {
    async save() {
      try {
        const resp = await this.$store.dispatch('sendLandImprovementInfo', this.data)
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
.my-card {
  border-width: 2px;
  border-color: #999999;
  padding-left: 10px;
}
</style>