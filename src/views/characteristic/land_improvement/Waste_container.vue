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
                        v-model="container_site"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-material-field">
            <label>Материал покрытия контейнерной площадки</label>
            <div class="select">
              <q-select outlined v-model="container_site_material" :options="['Бетон', 'Асфальт', 'Иное']"/>
            </div>
          </div>
          <div v-if="container_site_material === 'Иное'">
            <label>Введите материал покрытия контейнерной площадки</label>
            <q-input outlined v-model="other_material"/>
          </div>
          <div class="input-field-window-percent">
            <label>Площадь контейнерной площадки, м2</label>
            <q-input outlined type="number" v-model.number="container_site_square"/>
          </div>
          <div class="select-type-field">
            <label>Наличие ограждения контейнерной площадки</label>
            <div class="select">
              <q-select outlined v-model="container_site_fence"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-count">
            <label>Суммарный объем контейнеров, м3</label>
            <q-input outlined type="number" v-model.number="total_container_volume"/>
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
  name: "Waste_container",
  data: () => ({
    loading: true,
    container_site_square: null,
    container_site_material: null,
    other_material: null,
    container_site: null,
    container_site_fence: null,
    total_container_volume: null
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
        if (this.other_material) {
          this.container_site_material = this.other_material
        }
        const data = {
          container_site_square: this.container_site_square,
          container_site_material: this.container_site_material,
          container_site: this.container_site,
          container_site_fence: this.container_site_fence,
          total_container_volume: this.total_container_volume,
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
      this.container_site_square = info['container_site_square']
      this.container_site_material = info['container_site_material']
      this.container_site = info['container_site']
      this.container_site_fence = info['container_site_fence']
      this.total_container_volume = info['total_container_volume']
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