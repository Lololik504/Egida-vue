<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Система видеонаблюдение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-year">
            <label>Год установки системы видеонаблюдения</label>
            <q-input outlined v-model.number="setting_year"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     lazy-rules
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="select-type-field">
            <label>Вид системы видеонаблюдения</label>
            <div class="select">
              <q-select outlined v-model="type" :options="['Аналоговое', 'Цифровое']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствует техническим требованиям программы «Безопасный город»</label>
            <div class="select">
              <q-select outlined v-model="isSafe" :options="['Да', 'Нет']"/>
            </div>
          </div>
          <div class="input-field-window-square">
            <label>Количество камер внутри помещения</label>
            <q-input outlined type="number" v-model.number="inside_count"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество наружных камер</label>
            <q-input outlined type="number" v-model.number="outside_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на систему видеонаблюдения</label>
            <div class="select">
              <q-select outlined v-model="hasProject" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы водоснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status" val="Работоспособное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Работоспособное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния здания, при которой некоторые из численно
                      оцениваемых контролируемых параметров не отвечают требованиям проекта, норм и стандартов, но
                      имеющиеся нарушения требований, например, по деформативности, а в железобетоне и по
                      трещиностойкости, в данных конкретных условиях эксплуатации не приводят к нарушению
                      работоспособности, и несущая способность конструкций, с учетом влияния имеющихся дефектов и
                      повреждений, обеспечивается.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status" val="Неисправное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="input-field-window-square" v-if="status">
              <label>Количество камер</label>
              <q-input outlined type="number" v-model.number="count"/>
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
  name: "CCTV",
  data: () => ({
    loading: false,
    setting_year: null,
    type: null,
    status: null,
    isSafe: null,
    hasProject: null,
    inside_count: null,
    outside_count: null,
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