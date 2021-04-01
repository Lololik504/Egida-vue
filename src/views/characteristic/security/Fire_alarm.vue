<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Автоматическая пожарная сигнализация и система оповещения и управления эвакуацией людей (АПС и
        СОУЭ)</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-year">
            <label>Год установки АПС</label>
            <q-input outlined v-model.number="data.APS_installation_year"
                     placeholder="гггг"
                     type="tel"
                     :disable="disable"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined :disable="disable" v-model="data.APS_and_SOUE_service_organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание АПС и СОУЭ в год, тыс.руб.</label>
            <q-input outlined :disable="disable" step="0.00001" type="number"
                     v-model.number="data.price_for_APS_and_SOUE_per_year"/>
          </div>
          <div class="input-field-year">
            <label>Год модернизации АПС</label>
            <q-input outlined v-model.number="data.APS_modernization_year"
                     placeholder="гггг"
                     type="tel"
                     :disable="disable"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на АПС</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        emit-value
                        map-options
                        v-model="data.APS_project"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной АПС</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        emit-value
                        map-options
                        v-model="data.APS_compliance_with_the_project"
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Вид АПС</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.APS_type" :options="['Адресная', 'Аналоговая']"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год установки СОУЭ</label>
            <q-input outlined v-model.number="data.SOUE_installation_year"
                     placeholder="гггг"
                     :disable="disable"
                     type="tel"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="input-field-window-square">
            <label>Тип СОУЭ</label>
            <q-input outlined :disable="disable" type="number" v-model.number="data.SOUE_type"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на СОУЭ</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.SOUE_project"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной СОУЭ</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.SOUE_compliance_with_the_project"
                        emit-value
                        map-options
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
            </div>
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

export default {
  name: "Fire_alarm",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      id: null,
      APS_installation_year: null,
      APS_and_SOUE_service_organization_name: null,
      APS_modernization_year: null,
      APS_project: null,
      APS_compliance_with_the_project: null,
      APS_type: null,
      SOUE_installation_year: null,
      SOUE_type: null,
      SOUE_project: null,
      SOUE_compliance_with_the_project: null,
      price_for_APS_and_SOUE_per_year: null
    }
  }),
  methods: {
    async save() {
      try {
        const resp = await this.$store.dispatch('sendSecurityInfo', this.data)
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
      const info = await this.$store.dispatch('fetchSecurity', {token, id})
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