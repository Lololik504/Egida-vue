<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Спортзал</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Количество спортзалов</label>
            <q-input outlined type="number" v-model="gym_room_total_count"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние спортзалов:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="gym_technical_condition" val="Работоспособное состояние"/>
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
                    <q-radio v-model="gym_technical_condition" val="Ограниченно работоспособное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния здания или его строительных конструкций,
                      при которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей
                      способности,
                      но отсутствует опасность внезапного разрушения и функционирование конструкции возможно при
                      контроле ее состояния, продолжительности и условий эксплуатации.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="gym_technical_condition === 'Ограниченно работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Процент</label>
                    <q-input outlined type="number" v-model="gym_percent_of_technical_condition_field"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="gym_technical_condition" val="Аварийное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="gym_technical_condition === 'Аварийное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Процент</label>
                    <q-input outlined type="number" v-model="gym_percent_of_technical_condition_field"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="act"
                  outlined
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
                        v-model="gym_exhaust_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="gym_exhaust_ventilation">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        v-model="gym_exhaust_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined
                        v-model="gym_ventilation_type" :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        v-model="gym_supply_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="gym_supply_ventilation === 'Есть'">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        v-model="gym_supply_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined v-model="gym_air_heater_type" :options="['Водяной', 'Электрический']"/>
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
  name: "Gym",
  data: () => ({
    act: null,
    gym_technical_condition: null,
    gym_room_total_count: null,
    gym_percent_of_technical_condition_field: null,
    gym_exhaust_ventilation: null,
    gym_supply_ventilation: null,
    gym_exhaust_ventilation_is_workable: null,
    gym_supply_ventilation_is_workable: null,
    gym_ventilation_type: null,
    gym_air_heater_type: null,
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
        const data = {
          gym_technical_condition: this.gym_technical_condition,
          gym_room_total_count: this.gym_room_total_count,
          gym_percent_of_technical_condition_field: this.gym_percent_of_technical_condition_field,
          gym_exhaust_ventilation: this.gym_exhaust_ventilation,
          gym_supply_ventilation: this.gym_supply_ventilation,
          gym_exhaust_ventilation_is_workable: this.gym_exhaust_ventilation_is_workable,
          gym_supply_ventilation_is_workable: this.gym_supply_ventilation_is_workable,
          gym_ventilation_type: this.gym_ventilation_type,
          gym_air_heater_type: this.gym_air_heater_type,
          id: this.$route.params['id']
        }
        console.log(data)
        const resp = await this.$store.dispatch('sendIndoorInfo', data)
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
      this.gym_air_heater_type = info['gym_air_heater_type']
      this.gym_ventilation_type = info['gym_ventilation_type']
      this.gym_supply_ventilation_is_workable = info['gym_supply_ventilation_is_workable']
      this.gym_exhaust_ventilation_is_workable = info['gym_exhaust_ventilation_is_workable']
      this.gym_supply_ventilation = info['gym_supply_ventilation']
      this.gym_exhaust_ventilation = info['gym_exhaust_ventilation']
      this.gym_percent_of_technical_condition_field = info['gym_percent_of_technical_condition_field']
      this.gym_room_total_count = info['gym_room_total_count']
      this.gym_technical_condition = info['gym_technical_condition']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>