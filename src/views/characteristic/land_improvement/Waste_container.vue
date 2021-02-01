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
              <q-select outlined v-model="hasContainer" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div class="select-material-field">
            <label>Материал покрытия контейнерной площадки</label>
            <div class="select">
              <q-select outlined v-model="material" :options="['Бетон', 'Асфальт', 'Иное']"/>
            </div>
          </div>
          <div v-if="material === 'Иное'">
            <label>Введите материал покрытия контейнерной площадки</label>
            <q-input outlined v-model="other_material"/>
          </div>
          <div class="input-field-window-percent">
            <label>Площадь контейнерной площадки, м2</label>
            <q-input outlined type="number" v-model.number="square"/>
          </div>
          <div class="select-type-field">
            <label>Наличие ограждения контейнерной площадки</label>
            <div class="select">
              <q-select outlined v-model="hasFencing" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div class="input-field-window-count">
            <label>Суммарный объем контейнеров, м3</label>
            <q-input outlined type="number" v-model.number="volume"/>
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
  name: "Waste_container",
  data: () => ({
    loading: false,
    square: null,
    material: null,
    other_material: null,
    hasContainer: null,
    hasFencing: null,
    volume: null
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