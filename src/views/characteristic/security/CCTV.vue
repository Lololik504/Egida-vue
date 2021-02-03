<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Система видеонаблюдение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-year">
            <label>Год установки системы видеонаблюдения</label>
            <q-input outlined v-model.number="CCTV_installation_year"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="select-type-field">
            <label>Вид системы видеонаблюдения</label>
            <div class="select">
              <q-select outlined v-model="CCTV_type" :options="['Аналоговое', 'Цифровое']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствует техническим требованиям программы «Безопасный город»</label>
            <div class="select">
              <q-select outlined
                        v-model="CCTV_complies_safe_city_program"
                        emit-value
                        map-options
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-square">
            <label>Количество камер внутри помещения</label>
            <q-input outlined type="number" v-model.number="indoor_cameras_count"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество наружных камер</label>
            <q-input outlined type="number" v-model.number="outdoor_cameras_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на систему видеонаблюдения</label>
            <div class="select">
              <q-select outlined
                        v-model="CCTV_project"
                        emit-value
                        map-options
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы видеонаблюдения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="CCTV_is_workable" val="true"/>
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
                    <q-radio v-model="CCTV_is_workable" val="false"/>
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
            <div class="input-field-window-square" v-if="CCTV_is_workable !== null">
              <label>Количество камер</label>
              <q-input outlined type="number" v-model.number="unworkable_cameras_count"/>
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
  name: "CCTV",
  data: () => ({
    loading: true,
    CCTV_installation_year: null,
    CCTV_type: null,
    CCTV_is_workable: null,
    CCTV_complies_safe_city_program: null,
    CCTV_project: null,
    indoor_cameras_count: null,
    outdoor_cameras_count: null,
    unworkable_cameras_count: null
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
          CCTV_installation_year: this.CCTV_installation_year,
          CCTV_type: this.CCTV_type,
          CCTV_is_workable: this.CCTV_is_workable === 'true' ? true : this.CCTV_is_workable === 'false' ? false : null,
          CCTV_complies_safe_city_program: this.CCTV_complies_safe_city_program,
          CCTV_project: this.CCTV_project,
          indoor_cameras_count: this.indoor_cameras_count,
          outdoor_cameras_count: this.outdoor_cameras_count,
          unworkable_cameras_count: this.unworkable_cameras_count,
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
      this.CCTV_installation_year = info['CCTV_installation_year']
      this.CCTV_type = info['CCTV_type']
      this.CCTV_is_workable = info['CCTV_is_workable'].toString()
      this.CCTV_complies_safe_city_program = info['CCTV_complies_safe_city_program']
      this.CCTV_project = info['CCTV_project']
      this.indoor_cameras_count = info['indoor_cameras_count']
      this.outdoor_cameras_count = info['outdoor_cameras_count']
      this.unworkable_cameras_count = info['unworkable_cameras_count']
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