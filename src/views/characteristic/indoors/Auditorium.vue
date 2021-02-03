<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Актовый зал</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <q-card flat bordered class="my-card">
            <label>Техническое состояние актовых залов:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.auditorium_ok_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.auditorium_warning_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.auditorium_emergency_percent"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
          </q-card>
          <br/>
          <div class="select-type-field">
            <label>Наличие вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_exhaust_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.auditorium_exhaust_ventilation">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_exhaust_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.auditorium_ventilation_type"
                        :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_supply_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.auditorium_supply_ventilation">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_supply_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.auditorium_air_heater_type" :options="['Водяной', 'Электрический']"/>
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
import messages from "@/utils/messages";

export default {
  name: "Auditorium",
  data: () => ({
    act: null,
    disable: true,
    data: {
      id: null,
      auditorium_technical_condition: null,
      auditorium_ok_percent: null,
      auditorium_warning_percent: null,
      auditorium_emergency_percent: null,
      auditorium_exhaust_ventilation: null,
      auditorium_supply_ventilation: null,
      auditorium_exhaust_ventilation_is_workable: null,
      auditorium_supply_ventilation_is_workable: null,
      auditorium_ventilation_type: null,
      auditorium_air_heater_type: null,
    },
    loading: true,
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
        const resp = await this.$store.dispatch('sendIndoorInfo', this.data)
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
        window.scrollTo(0,0)
        this.$message(messages[text])
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchIndoors', {token, id})
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

</style>