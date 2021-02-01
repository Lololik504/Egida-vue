<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Автоматическая пожарная сигнализация и система оповещения и управления эвакуацией людей (АПС и СОУЭ)</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-year">
            <label>Год установки АПС</label>
            <q-input outlined v-model.number="year_set_APS"
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
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined v-model="organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание АПС и СОУЭ в год, тыс.руб.</label>
            <q-input outlined type="number" v-model.number="count"/>
          </div>
          <div class="input-field-year">
            <label>Год модернизации АПС</label>
            <q-input outlined v-model.number="year_upgrade_APS"
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
            <label>Наличие проекта на АПС</label>
            <div class="select">
              <q-select outlined v-model="hasAPS" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной АПС</label>
            <div class="select">
              <q-select outlined v-model="projectAPS" :options="['Да', 'Нет']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Вид АПС</label>
            <div class="select">
              <q-select outlined v-model="typeAPS" :options="['Адресная', 'Аналоговая']"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год установки СОУЭ</label>
            <q-input outlined v-model.number="yearSOU"
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
          <div class="input-field-window-square">
            <label>Тип СОУЭ</label>
            <q-input outlined type="number" v-model.number="typeSOU"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на СОУЭ</label>
            <div class="select">
              <q-select outlined v-model="hasSOU" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной СОУЭ</label>
            <div class="select">
              <q-select outlined v-model="projectSOU" :options="['Да', 'Нет']"/>
            </div>
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
  name: "Fire_alarm",
  data: () => ({
    loading: false,
    year_set_APS: null,
    organization_name: null,
    year_upgrade_APS: null,
    hasAPS: null,
    projectAPS: null,
    typeAPS: null,
    yearSOU: null,
    typeSOU: null,
    hasSOU: null,
    projectSOU: null,
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