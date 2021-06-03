<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Система видеонаблюдение</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-year">
            <label>Год установки системы видеонаблюдения</label>
            <q-input outlined v-model.number="data.CCTV_installation_year"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг(начиная от 1900 г, не ранее)"
                     mask="####"
                     ref="year"
                     :disable="disable"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="select-type-field">
            <label>Вид системы видеонаблюдения</label>
            <div class="select">
              <q-select outlined v-model="data.CCTV_type" :disable="disable" :options="['Аналоговое', 'Цифровое']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Соответствует техническим требованиям программы «Безопасный город»</label>
            <div class="select">
              <q-select outlined
                        v-model="data.CCTV_complies_safe_city_program"
                        :disable="disable"
                        emit-value
                        map-options
                        :options="[{label: 'Да', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-window-square">
            <label>Количество камер внутри помещения</label>
            <q-input outlined type="number" :disable="disable" v-model.number="data.indoor_cameras_count"/>
          </div>
          <div class="input-field-window-square">
            <label>Количество наружных камер</label>
            <q-input outlined type="number" :disable="disable" v-model.number="data.outdoor_cameras_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие проекта на систему видеонаблюдения</label>
            <div class="select">
              <q-select outlined
                        v-model="data.CCTV_project"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы видеонаблюдения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.CCTV_is_workable" :disable="disable" :val="true"/>
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
                    <q-radio v-model="data.CCTV_is_workable" :disable="disable" :val="false"/>
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
            <div class="input-field-window-square" v-if="data.CCTV_is_workable !== null">
              <label>Количество камер</label>
              <q-input outlined type="number" :disable="disable" v-model.number="data.unworkable_cameras_count"/>
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
  name: "CCTV",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      id: null,
      CCTV_installation_year: null,
      CCTV_type: null,
      CCTV_is_workable: null,
      CCTV_complies_safe_city_program: null,
      CCTV_project: null,
      indoor_cameras_count: null,
      outdoor_cameras_count: null,
      unworkable_cameras_count: null
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
.my-card {
  border-width: 2px;
  border-color: #999999;
  padding-left: 10px;
}
</style>