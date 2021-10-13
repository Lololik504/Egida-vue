<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Бассейны</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Наличие бассейна</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.pool_available"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Работоспособность бассейна</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.pool_working"
                        :options="[{label: 'Работает', value: true}, {label: 'Не работает', value: false}]"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Режим работы бассейна</label>
            <div class="input">
              <label>Количество часов в день</label>
              <q-input outlined type="number" v-model.number="data.pool_hours_in_day"/>
            </div>
            <div class="input">
              <label>Количество дней в неделю</label>
              <q-input outlined type="number" v-model.number="data.pool_days_in_week"/>
            </div>
          </q-card>
          <div class="input">
            <label>Количество человек в день</label>
            <q-input outlined type="number" v-model.number="data.pool_people_in_day"/>
          </div>
          <div class="select-type-field">
            <label>Состояние чаши бассейна</label>
            <div class="select">
              <q-select outlined v-model="data.pool_bowl_condition"
                        :disable="disable"
                        :options="['Требуется ремонт', 'Не требуется ремонт']"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Размер чаши бассейна</label>
            <div class="input">
              <label>Длина, м</label>
              <q-input outlined type="number" step="0.001" v-model.number="data.pool_bowl_length"/>
            </div>
            <div class="input">
              <label>Ширина, м</label>
              <q-input outlined type="number" step="0.001" v-model.number="data.pool_bowl_width"/>
            </div>
            <div class="input">
              <label>Глубина, м</label>
              <q-input outlined type="number" step="0.001" v-model.number="data.pool_bowl_depth"/>
            </div>
          </q-card>
          <div class="select-type-field">
            <label>Характер водообмена</label>
            <div class="select">
              <q-select outlined v-model="data.nature_of_water_exchange"
                        :disable="disable"
                        :options="['Оборотный тип', 'Проточный тип', 'С периодичной сменой воды']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие фильтровальной установки</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.filtration_unit"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год ввода в эксплуатацию фильтровальной установки</label>
            <q-input outlined
                     v-model.number="data.filtration_unit_year"
                     placeholder="гггг"
                     type="tel"
                     mask="####"
                     unmasked-value
            />
          </div>
          <div class="input">
            <label>Организация обслуживающая фильтровальную установку</label>
            <q-input outlined v-model="data.filtration_unit_organization"/>
          </div>
          <div class="select-type-field">
            <label>Режим наполнения чаши бассейна</label>
            <div class="select">
              <q-select outlined v-model="data.pool_bowl_schedule"
                        :disable="disable"
                        :options="['Ежедневно', 'Еженедельно', 'Ежемесячно', '1 раз в полугодие', '1 раз в год', 'Свой вариант']"/>
            </div>
          </div>
          <div class="input" v-if="data.pool_bowl_schedule === 'Свой вариант'">
            <label>Введите свой вариант</label>
            <q-input outlined v-model="other_pool_bowl_schedule"/>
          </div>
          <div class="select-type-field">
            <label>Состояние системы отопления в помещении бассейна</label>
            <div class="select">
              <q-select outlined v-model="data.heating_system_condition"
                        :disable="disable"
                        :options="['Удовлетворительно', 'Неудовлетворительно']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Состояние системы обогрева дорожек в помещении бассейна</label>
            <div class="select">
              <q-select outlined v-model="data.heating_lines_system_condition"
                        :disable="disable"
                        :options="['Удовлетворительно', 'Неудовлетворительно']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.pool_exhaust_ventilation"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div v-if="data.pool_exhaust_ventilation" class="select-type-field">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.pool_exhaust_ventilation_condition"
                        :disable="disable"
                        :options="['Работоспособное', 'Неисправное']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.pool_ventilation_type"
                        :disable="disable"
                        :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.pool_supply_ventilation"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div v-if="data.pool_supply_ventilation" class="select-type-field">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.pool_supply_ventilation_condition"
                        :disable="disable"
                        :options="['Работоспособное', 'Неисправное']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined v-model="data.pool_air_heater_type"
                        :disable="disable"
                        :options="['Водяной', 'Электрический']"/>
            </div>
          </div>
          <button class="btn waves-effect waves" @click.prevent="disable = false" v-if="disable">
            Редактирование
          </button>
          <div class="q-gutter-sm" v-else>
            <button class="btn waves-effect waves-light" type="submit">
              Сохранить
            </button>
            <button class="btn waves-effect waves" @click.prevent="cancel">
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
  name: "Pool",
  data: () => ({
    other_pool_bowl_schedule: null,
    disable: true,
    data: {
      id: null,
      pool_exhaust_ventilation: null,
      pool_supply_ventilation: null,
      pool_exhaust_ventilation_condition: null,
      pool_supply_ventilation_condition: null,
      pool_ventilation_type: null,
      pool_air_heater_type: null,
      heating_lines_system_condition: null,
      pool_bowl_schedule: null,
      heating_system_condition: null,
      filtration_unit_organization: null,
      filtration_unit_year: null,
      filtration_unit: null,
      nature_of_water_exchange: null,
      pool_bowl_depth: null,
      pool_bowl_width: null,
      pool_bowl_length: null,
      pool_bowl_condition: null,
      pool_people_in_day: null,
      pool_days_in_week: null,
      pool_hours_in_day: null,
      pool_working: null,
      pool_available: null
    },
    loading: false,
  }),
  computed: {
    getPermission() {
      return this.$store.getters.permission <= 10
    }
  },
  methods: {
    async cancel() {
      this.disable = true
      await this.loadingPage()
    },
    async save() {
      const arrayOfNumbersVars = ['filtration_unit_year', 'pool_bowl_depth', 'pool_bowl_width', 'pool_bowl_length', 'pool_people_in_day', 'pool_days_in_week', 'pool_hours_in_day']
      try {
        let form_data = new FormData()
        if (this.other_pool_bowl_schedule) this.data.pool_bowl_schedule = this.other_pool_bowl_schedule
        for (let key in this.data) {
          if (arrayOfNumbersVars.includes(key)) {
            this.data[key] = Number(this.data[key])
          }
          form_data.append(key, this.data[key])
        }
        const resp = await this.$store.dispatch('sendIndoorInfo', form_data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.changedAct = false;
          await this.loadingPage()
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
    },
    async loadingPage() {
      this.loading = true
      const token = localStorage.getItem('token')
      const id = this.$route.params['id']
      try {
        const info = await this.$store.dispatch('fetchIndoors', {token, id})
        const tmp = Object.keys(this.data)
        for (let item in info) {
          if (tmp.includes(item)) {
            info[item] === '/media/null' ? info[item] = null : null
            info[item] === 'null' ? info[item] = null : null
            this.data[item] = info[item]
          }
        }
        this.data['id'] = id
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    await this.loadingPage()
  }
}
</script>

<style scoped>
.my-card {
  border-width: 2px;
  border-color: #999999;
  padding-left: 10px;
}
</style>