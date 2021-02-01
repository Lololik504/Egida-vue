<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Доступная среда</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <q-card bordered flat class="q-pa-sm">
          <h6>
            <strong>Паспорт доступности:</strong>
          </h6>
            <div class="checkbox col">
              <q-checkbox v-model="agreed" dense left-label
                          label="Согласован:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Опубликован на сайте образовательного учреждения:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Уличная территория:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="agreed" dense left-label
                          label="Наличие разметки и знака парковки для инвалидов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие асфальтируемой территории с низким бордюрам и спуском:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие игровых площадок для детей с ограниченными возможностями:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие индукционных систем для слабослышащих:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Вход в здание:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="agreed" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие функции автоматического открывания дверей:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие противоскользящего покрытия:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие подъемников и лифтов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие пандусов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Движение по этажам:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="agreed" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие функции автоматического открывания дверей:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие противоскользящего покрытия:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие подъемников и лифтов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие пандусов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Санузлы:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="published" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
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
export default {
  name: "Accessible_environment",
  data: () => ({
    loading: false,
    agreed: null,
    published: null,

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