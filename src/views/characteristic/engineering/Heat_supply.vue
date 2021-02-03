<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong> Система отопления, вентиляции и горячего водоснабжения</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Энергоснабжающая организация</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heat_power_supply_organization" :options="organizations"/>
            </div>
          </div>
          <div v-if="data.heat_power_supply_organization === organizations[2]">
            <label>Введите иную энергоснабжающую организацию</label>
            <q-input outlined :disable="disable" v-model="other_organization"/>
          </div>
          <div class="select-type-field">
            <label>Тип теплового пункта</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heat_point_type" :options="types"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год ввода в эксплуатацию ИТП</label>
            <q-input outlined v-model.number="data.ITP_commissioning_year"
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
          <div class="input-field-year">
            <label>Год принятия на баланс или техобслуживание</label>
            <q-input outlined v-model.number="data.year_of_acceptance_on_maintenance"
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
            <label>Источник теплоснабжения</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heat_supply_source" :options="warm_sources"/>
            </div>
          </div>
          <div v-if="data.heat_supply_source === warm_sources[6]">
            <label>Введите иной источник теплоснабжения</label>
            <q-input outlined :disable="disable" v-model="other_warm_source"/>
          </div>
          <div class="input-field-roof-square">
            <label>Питание от камеры №</label>
            <q-input outlined :disable="disable" v-model="data.heat_powered_by_camera"/>
          </div>
          <div class="input-field-roof-square">
            <label>Питание от магистрали №</label>
            <q-input outlined :disable="disable" v-model="data.heat_power_supply_from_line"/>
          </div>
          <div class="select-type-field">
            <label>Граница эксплуатационной ответственности</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.operational_responsibility_boundary" :options="borders"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Схема подключение горячего водоснабжения</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.hot_water_connection_diagram" :options="schemas"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип присоединения системы отопления</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heating_system_connection_type" :options="schema_types"/>
            </div>
          </div>
          <div class="input-field-mask">
            <label>Температурный график</label>
            <q-input outlined
                     :disable="disable"
                     v-model.number="data.Temperature_graph"
                     hint="ввод цифрами в формате ххх/хx"
                     mask="###/##"
            />
          </div>
          <div class="select-type-field">
            <label>Тип разводки системы отопления</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heating_system_wiring_type" :options="wiring_types"/>
            </div>
          </div>
          <h5><strong>Тепловые нагрузки</strong></h5>
          <div class="row">
            <div class="col">
              <label>Отопление</label>
              <q-input outlined :disable="disable" type="number" v-model.number="data.thermal_loads_heating"/>
            </div>
            <div class="col">
              <label>Горячее водоснабжение</label>
              <q-input outlined :disable="disable" type="number" v-model.number="data.thermal_loads_hot_water_supply"/>
            </div>
            <div class="col">
              <label>Вентиляция</label>
              <q-input outlined :disable="disable" type="number" v-model.number="data.thermal_loads_ventilation"/>
            </div>
            <div class="col">
              <label>Суммарная</label>
              <q-input outlined :disable="disable" type="number" v-model.number="data.thermal_loads_total"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования тепла</label>
            <q-input outlined :disable="disable" type="number" v-model="data.number_of_automatic_heat_control_systems"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования приточной установки</label>
            <q-input outlined :disable="disable" type="number" v-model="data.number_of_automatic_control_systems_for_the_air_handling_unit"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы отопления:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system" val="Аварийное состояние"/>
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
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.act_heating"
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
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы вентиляции:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system" val="Аварийное состояние"/>
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
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.act_ventilation"
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
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы горячего водоснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system" val="Аварийное состояние"/>
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
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.act_water_supply"
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
<!--          <h5><strong>Документация</strong></h5>-->
<!--          <div class="row">-->
<!--            <div class="col">-->
<!--              <label>Паспорт ввода</label>-->
<!--              <q-file-->
<!--                  v-model="inputPassportDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Схема ввода</label>-->
<!--              <q-file-->
<!--                  v-model="inputSchemaDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Паспорт ИТП</label>-->
<!--              <q-file-->
<!--                  v-model="passportITPDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row">-->
<!--            <div class="col">-->
<!--              <label>Схема ИТП</label>-->
<!--              <q-file-->
<!--                  v-model="schemaITPDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Акт балансового разграничения</label>-->
<!--              <q-file-->
<!--                  v-model="balanceActDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Схема балансового разграничения</label>-->
<!--              <q-file-->
<!--                  v-model="balanceSchemaDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row">-->
<!--            <div class="col">-->
<!--              <label>Справка о тепловых нагрузках</label>-->
<!--              <q-file-->
<!--                  v-model="referenceDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Расчет тепловых потерь</label>-->
<!--              <q-file-->
<!--                  v-model="paymentDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Топоснова</label>-->
<!--              <q-file-->
<!--                  v-model="toposnovaDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
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
  name: "Heat_supply",
  data: () => ({
    organizations: ['ООО Сибирская генерирующая компания', 'ФГУП УЭВ', 'Иное'],
    other_organization: null,
    other_warm_source: null,
    types: ['Отдельно стоящий', 'Пристроенный', 'Встроенный в здание'],
    warm_sources: [
      'ТЭЦ-1',
      'ТЭЦ-2',
      'ТЭЦ-3',
      'ТЭЦ-4',
      'ТЭЦ-5',
      'КРК',
      'Иное'
    ],
    borders: ['Стена здания', 'Точка врезки', 'Прочее'],
    schemas: ['Отдельный ввод с циркуляцией',
      'Отдельный ввод без циркуляции',
      'Собственная водоподогревательная установка',
      'Открытая схема'
    ],
    schema_types: [
      'Элеваторное',
      'Насосное (САРТ)',
      'Непосредственное (с установкой дроссельной шайбы на вводе)',
      'Независимое (с установкой водоподогревательной установки отопления)'
    ],
    wiring_types: [
      'Верхний розлив',
      'Нижний розлив'
    ],
    disable: true,
    data: {
      id: null,
      heating_system_connection_type: null,
      hot_water_connection_diagram: null,
      heat_point_type: null,
      operational_responsibility_boundary: null,
      heat_power_supply_organization: null,
      ITP_commissioning_year: null,
      year_of_acceptance_on_maintenance: null,
      heat_supply_source: null,
      heat_powered_by_camera: null,
      heat_power_supply_from_line: null,
      heating_system_wiring_type: null,
      Temperature_graph: null,
      thermal_loads_heating: null,
      thermal_loads_hot_water_supply: null,
      thermal_loads_ventilation: null,
      thermal_loads_total: null,
      number_of_automatic_heat_control_systems: null,
      number_of_automatic_control_systems_for_the_air_handling_unit: null,
      technical_condition_of_the_heating_system: null,
      act_heating: null,
      technical_condition_of_the_ventilation_system: null,
      act_ventilation: null,
      technical_condition_of_the_hot_water_supply_system: null,
      act_water_supply: null,
      inputPassportDoc: null,
      inputSchemaDoc: null,
      passportITPDoc: null,
      schemaITPDoc: null,
      balanceActDoc: null,
      balanceSchemaDoc: null,
      referenceDoc: null,
      paymentDoc: null,
      toposnovaDoc: null,
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
        if (this.other_organization) {
          this.data.heat_power_supply_organization = this.other_organization
        }
        if (this.other_warm_source) {
          this.data.heat_supply_source = this.other_warm_source
        }
        const resp = await this.$store.dispatch('sendEngineeringInfo', this.data)
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
      const info = await this.$store.dispatch('fetchEngineering', {token, id})
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