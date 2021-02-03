<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Контейнерная площадка для сбора твердых коммунальных отходов</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Наличие контейнерной площадки</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.container_site"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-material-field">
            <label>Материал покрытия контейнерной площадки</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.container_site_material" :options="['Бетон', 'Асфальт', 'Иное']"/>
            </div>
          </div>
          <div v-if="data.container_site_material === 'Иное'">
            <label>Введите материал покрытия контейнерной площадки</label>
            <q-input outlined :disable="disable" v-model="data.other_material"/>
          </div>
          <div class="input-field-window-percent">
            <label>Площадь контейнерной площадки, м2</label>
            <q-input outlined :disable="disable" type="number" v-model.number="data.container_site_square"/>
          </div>
          <div class="select-type-field">
            <label>Наличие ограждения контейнерной площадки</label>
            <div class="select">
              <q-select outlined v-model="data.container_site_fence"
                        :disable="disable"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-count">
            <label>Суммарный объем контейнеров, м3</label>
            <q-input outlined :disable="disable" type="number" v-model.number="data.total_container_volume"/>
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
  name: "Waste_container",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      id: null,
      container_site_square: null,
      container_site_material: null,
      other_material: null,
      container_site: null,
      container_site_fence: null,
      total_container_volume: null
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
        if (this.data.other_material) {
          this.data.container_site_material = this.data.other_material
        }
        const resp = await this.$store.dispatch('sendLandImprovementInfo', this.data)
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
.select {
  margin-bottom: 1px;
}
</style>