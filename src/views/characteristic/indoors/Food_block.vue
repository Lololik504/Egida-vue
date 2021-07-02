<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Пищеблок</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Тип пищеблока по проектной документации</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_project_type"
                        :disable="disable"
                        :options="['Полного цикла', 'Доготовочный', 'Раздаточный']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип фактического использования пищеблока</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_fact_type"
                        :disable="disable"
                        :options="['Полного цикла', 'Доготовочный', 'Раздаточный']"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год строительства пищеблока</label>
            <q-input outlined
                     v-model.number="data.food_block_building_year"
                     placeholder="гггг"
                     type="tel"
                     mask="####"
                     unmasked-value
            />
          </div>
          <div class="input-field-year">
            <label>Год последнего капитального ремонта пищеблока</label>
            <q-input outlined
                     v-model.number="data.food_block_refactoring_year"
                     placeholder="гггг"
                     type="tel"
                     mask="####"
                     unmasked-value
            />
          </div>
          <div class="select-type-field">
            <label>Требуется ли переоснащение, дооснащение производственного оборудования</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_equipment"
                        :disable="disable"
                        :options="['Переоснащение', 'Дооснащение']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Оценочная стоимость переоснащения/дооснащения</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_equipment_cost"
                        :disable="disable"
                        :options="['Не проводилась', 'Проводилась']"/>
            </div>
          </div>
          <div v-if="data.food_block_equipment_cost === 'Проводилась'">
            <label>Сумма переоснащения/дооснащения (руб.)</label>
            <q-input outlined type="number" step="0.001" v-model.number="data.food_block_equipment_cost_number"/>
          </div>
          <div>
            <label>Проектное количество посадочных мест в зале приема пищи</label>
            <q-input outlined type="number" v-model.number="data.food_block_project_seat_count"/>
          </div>
          <div>
            <label>Фактическое количество посадочных мест в зале приема пищи</label>
            <q-input outlined type="number" v-model.number="data.food_block_fact_seat_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие комбината питания</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_combine_availability"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div v-if="data.food_block_combine_availability">
            <label>Количество комбинатов питания</label>
            <q-input outlined type="number" v-model.number="data.food_block_combine_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие школьно-базовых столовых</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_dining_availability"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div v-if="data.food_block_dining_availability">
            <label>Количество школьно-базовых столовых</label>
            <q-input outlined type="number" v-model.number="data.food_block_dining_count"/>
          </div>
          <div class="select-type-field">
            <label>Наличие производства полуфабрикатов и заготовок</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_production_availability"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div v-if="data.food_block_production_availability">
            <label>Количество производств полуфабрикатов и заготовок</label>
            <q-input outlined type="number" v-model.number="data.food_block_production_count"/>
          </div>
          <div class="select-type-field">
            <label>Форма организации питания</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_organization_form"
                        :disable="disable"
                        :options="['Аутсорсинг', 'Собственная служба']"/>
            </div>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние пищеблока:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.food_block_technical_condition" val="Работоспособное состояние"
                             :disable="disable"/>
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
                    <q-radio v-model="data.food_block_technical_condition" val="Ограниченно работоспособное состояние"
                             :disable="disable"/>
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
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.food_block_technical_condition" val="Аварийное состояние"
                             :disable="disable"/>
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
            <div v-if="!data.food_block_act" class="input-roof-photo" style="margin-left: 25px">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.food_block_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px; margin-left: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedAct" class="btn blue"
                        @click.prevent="showDoc(data.food_block_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.food_block_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('food_block_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <div class="select-type-field">
            <label>Наличие вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_exhaust_ventilation"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.food_block_exhaust_ventilation">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_exhaust_ventilation_is_workable"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_ventilation_type"
                        :disable="disable"
                        :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_supply_ventilation"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.food_block_supply_ventilation">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined v-model="data.food_block_supply_ventilation_is_workable"
                        emit-value
                        map-options
                        :disable="disable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.food_block_air_heater_type"
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
import {server_path} from "@/local_settings";

export default {
  name: "Food_block",
  data: () => ({
    act: null,
    disable: true,
    changedAct: false,
    data: {
      id: null,
      food_block_technical_condition: null,
      food_block_exhaust_ventilation: null,
      food_block_supply_ventilation: null,
      food_block_exhaust_ventilation_is_workable: null,
      food_block_supply_ventilation_is_workable: null,
      food_block_ventilation_type: null,
      food_block_air_heater_type: null,
      food_block_act: null,
      food_block_project_type: null,
      food_block_fact_type: null,
      food_block_building_year: null,
      food_block_refactoring_year: null,
      food_block_equipment: null,
      food_block_equipment_cost: null,
      food_block_equipment_cost_number: null,
      food_block_project_seat_count: null,
      food_block_fact_seat_count: null,
      food_block_combine_availability: null,
      food_block_combine_count: null,
      food_block_dining_availability: null,
      food_block_dining_count: null,
      food_block_production_availability: null,
      food_block_production_count: null,
      food_block_organization_form: null,
    },
    loading: false,
  }),
  computed: {
    getPermission() {
      return this.$store.getters.permission <= 10
    }
  },
  methods: {
    async deleteDoc(filename) {
      try {
        if (this.data[filename]) {
          await this.$store.dispatch('deleteIndoorsDoc', {id: this.data.id, docId: filename})
          this.data[filename] = null
          this.$showMessage('deleteSuccess')
        } else this.$showMessage('error')
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
    showDoc(url) {
      const link = document.createElement('a');
      link.href = server_path + url;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
    },
    async cancel() {
      this.disable = true
      await this.loadingPage()
    },
    onRejected() {
      this.$error('Файл слишком велик!')
    },
    async save() {
      try {
        let form_data = new FormData()
        for (let key in this.data) {
          if (key === 'food_block_act' && typeof this.data[key] === 'string') {
            continue
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
          info[item] === '/media/null' ? info[item] = null : null
          info[item] === 'null' ? info[item] = null : null
          if (tmp.includes(item)) {
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