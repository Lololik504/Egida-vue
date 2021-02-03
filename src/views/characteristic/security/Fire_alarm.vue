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
            <q-input outlined v-model.number="APS_installation_year"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="input-field-window-percent">
            <label>Наименование обслуживающей организации</label>
            <q-input outlined v-model="APS_and_SOUE_service_organization_name"/>
          </div>
          <div class="input-field-window-count">
            <label>Сумма на обслуживание АПС и СОУЭ в год, тыс.руб.</label>
            <q-input outlined type="number" v-model.number="price_for_APS_and_SOUE_per_year"/>
          </div>
          <div class="input-field-year">
            <label>Год модернизации АПС</label>
            <q-input outlined v-model.number="APS_modernization_year"
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
              <q-select outlined
                        emit-value
                        map-options
                        v-model="APS_project"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной АПС</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        v-model="APS_compliance_with_the_project"
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Вид АПС</label>
            <div class="select">
              <q-select outlined v-model="APS_type" :options="['Адресная', 'Аналоговая']"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год установки СОУЭ</label>
            <q-input outlined v-model.number="SOUE_installation_year"
                     placeholder="гггг"
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
            <q-input outlined type="number" v-model.number="SOUE_type"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на СОУЭ</label>
            <div class="select">
              <q-select outlined
                        v-model="SOUE_project"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствие проектной документации с установленной СОУЭ</label>
            <div class="select">
              <q-select outlined
                        v-model="SOUE_compliance_with_the_project"
                        emit-value
                        map-options
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
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
import messages from "@/utils/messages";

export default {
  name: "Fire_alarm",
  data: () => ({
    loading: true,
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
          APS_installation_year: this.APS_installation_year,
          APS_and_SOUE_service_organization_name: this.APS_and_SOUE_service_organization_name,
          APS_modernization_year: this.APS_modernization_year,
          APS_project: this.APS_project,
          APS_compliance_with_the_project: this.APS_compliance_with_the_project,
          APS_type: this.APS_type,
          SOUE_installation_year: this.SOUE_installation_year,
          SOUE_type: this.SOUE_type,
          SOUE_project: this.SOUE_project,
          SOUE_compliance_with_the_project: this.SOUE_compliance_with_the_project,
          price_for_APS_and_SOUE_per_year: this.price_for_APS_and_SOUE_per_year,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendSecurityInfo', data)
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
      const info = await this.$store.dispatch('fetchSecurity', {token, id})
      this.price_for_APS_and_SOUE_per_year = info['price_for_APS_and_SOUE_per_year']
      this.SOUE_compliance_with_the_project = info['SOUE_compliance_with_the_project']
      this.SOUE_project = info['SOUE_project']
      this.SOUE_type = info['SOUE_type']
      this.SOUE_installation_year = info['SOUE_installation_year']
      this.APS_type = info['APS_type']
      this.APS_compliance_with_the_project = info['APS_compliance_with_the_project']
      this.APS_project = info['APS_project']
      this.APS_modernization_year = info['APS_modernization_year']
      this.APS_and_SOUE_service_organization_name = info['APS_and_SOUE_service_organization_name']
      this.APS_installation_year = info['APS_installation_year']
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