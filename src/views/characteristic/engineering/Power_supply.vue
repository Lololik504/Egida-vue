<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Система электроснабжения</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Энергоснабжающая организация</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.power_supply_organization" :options="organizations"/>
            </div>
          </div>
          <div v-if="data.power_supply_organization === organizations[1]">
            <label>Введите иную энергоснабжающую организацию</label>
            <q-input outlined :disable="disable" v-model="other_organization"/>
          </div>
          <div class="select-type-field">
            <label>Принадлежность электрокабеля</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.electric_cable_accessory" :options="cables"/>
            </div>
          </div>
          <div v-if="data.electric_cable_accessory === cables[11]">
            <label>Введите принадлежность электрокабеля</label>
            <q-input outlined :disable="disable" v-model="other_cable"/>
          </div>
          <h5><strong>Категории надежности электроснабжения</strong></h5>
          <div class="row">
            <div class="col">
              <label>Фактическая</label>
              <q-input outlined :disable="disable" type="number" step="0.001"
                       v-model.number="data.actual_power_supply_reliability_category"/>
            </div>
            <div class="col">
              <label>Требуемая</label>
              <q-input outlined :disable="disable" type="number" step="0.001"
                       v-model.number="data.required_power_supply_reliability_category"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие резервных источников электропитания</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.availability_of_backup_power_supplies"
                        :options="reserve_sources"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Разрешенная мощность, кВт</label>
            <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="data.permitted_power"/>
          </div>
          <div class="select-type-field">
            <label>Наличие контура заземления</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        emit-value
                        map-options
                        v-model="data.ground_loop"
                        :options="conturs"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Количество энергосберегающих ламп внутреннего освещения, шт</label>
            <q-input outlined :disable="disable" type="number"
                     v-model.number="data.count_of_energy_saving_lamps_for_indoor_lighting"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество ламп накаливания внутреннего освещения, шт</label>
            <q-input outlined :disable="disable" type="number"
                     v-model.number="data.count_of_incandescent_lamps_for_indoor_lighting"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество энергосберегающих ламп наружного освещения, шт</label>
            <q-input outlined :disable="disable" type="number"
                     v-model.number="data.count_of_energy_saving_outdoor_lamps"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество ламп накаливания наружного освещения, шт</label>
            <q-input outlined :disable="disable" type="number"
                     v-model.number="data.count_of_incandescent_outdoor_lamps"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы внутреннего электроснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_internal_power_supply_system"
                             val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_internal_power_supply_system"
                             val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_internal_power_supply_system"
                             val="Аварийное состояние"/>
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
            <div v-if="!data.technical_condition_of_the_internal_power_supply_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_internal_power_supply_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedInternalAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedInternalAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_internal_power_supply_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_internal_power_supply_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_internal_power_supply_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы наружного электроснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_external_power_supply_system"
                             val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_external_power_supply_system"
                             val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_external_power_supply_system"
                             val="Аварийное состояние"/>
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
            <div v-if="!data.technical_condition_of_the_external_power_supply_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_external_power_supply_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedExternalAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedExternalAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_external_power_supply_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_external_power_supply_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_external_power_supply_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <h5><strong>Документация</strong></h5>
          <div class="row">
            <div v-if="!data.power_supply_system_act_balance_razgranich" class="col">
              <label>Акт балансового разграничени</label>
              <q-file
                  v-model="data.power_supply_system_act_balance_razgranich"
                  :disable="disable"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedBalanceAct = true"
              />
            </div>
            <div v-else class="col">
              <label>Акт балансового разграничени загружен</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedBalanceAct" class="btn blue"
                        @click.prevent="showDoc(data.power_supply_system_act_balance_razgranich)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.power_supply_system_act_balance_razgranich = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('power_supply_system_act_balance_razgranich')">
                  Удалить файл
                </button>
              </div>
            </div>
            <div v-if="!data.power_supply_system_scheme_balance_razgranich" class="col">
              <label>Схема балансового разграничения</label>
              <q-file
                  v-model="data.power_supply_system_scheme_balance_razgranich"
                  :disable="disable"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedBalanceScheme"
              />
            </div>
            <div v-else class="col">
              <label>Схема балансового разграничени загружена</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedBalanceScheme" class="btn blue"
                        @click.prevent="showDoc(data.power_supply_system_scheme_balance_razgranich)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.power_supply_system_scheme_balance_razgranich = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('power_supply_system_scheme_balance_razgranich')">
                  Удалить файл
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-if="!data.power_supply_system_odnolinein_schema" class="col">
              <label>Однолинейная схема</label>
              <q-file
                  v-model="data.power_supply_system_odnolinein_schema"
                  :disable="disable"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedSchema = true"
              />
            </div>
            <div v-else class="col">
              <label>Однолинейная схема загружена</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedSchema" class="btn blue"
                        @click.prevent="showDoc(data.power_supply_system_odnolinein_schema)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.power_supply_system_odnolinein_schema = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('power_supply_system_odnolinein_schema')">
                  Удалить файл
                </button>
              </div>
            </div>
            <div v-if="!data.power_supply_system_photo_vru" class="col">
              <label>Фото ВРУ</label>
              <q-file
                  v-model="data.power_supply_system_photo_vru"
                  :disable="disable"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedPhoto = true"
              />
            </div>
            <div v-else class="col">
              <label>Фото ВРУ загружено</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedPhoto" class="btn blue"
                        @click.prevent="showDoc(data.power_supply_system_photo_vru)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.power_supply_system_photo_vru = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('power_supply_system_photo_vru')">
                  Удалить файл
                </button>
              </div>
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
import {server_path} from "@/local_settings";

export default {
  name: "Power_supply",
  data: () => ({
    organizations: ['Новосибирскэнергосбыт', 'Иное'],
    other_cable: null,
    other_organization: null,
    cables: [
      'АО РЭС',
      'Горэлектросети',
      'Оборонэнерго',
      'Новосибирскэнерго',
      'Энергосети Сибири',
      'ГУП НСО НОЭ',
      'Новосибирск Авиа',
      'ООО ГКС',
      'ООО НЗХК',
      'ООО Энергоресурс',
      'ФГУП УЭВ',
      'Прочее'
    ],
    reserve_sources: [
      'Источник бесперебойного питания',
      'Дизель-генераторное устройство',
      'Резервный кабель'
    ],
    conturs: [{label: 'Имеется', value: true}, {label: 'Отсутствует', value: false}],
    disable: true,
    changedInternalAct: false,
    changedExternalAct: false,
    changedBalanceAct: false,
    changedBalanceScheme: false,
    changedSchema: false,
    changedPhoto: false,
    data: {
      id: null,
      power_supply_organization: null,
      electric_cable_accessory: null,
      actual_power_supply_reliability_category: null,
      required_power_supply_reliability_category: null,
      availability_of_backup_power_supplies: null,
      permitted_power: null,
      ground_loop: null,
      count_of_energy_saving_lamps_for_indoor_lighting: null,
      count_of_energy_saving_outdoor_lamps: null,
      count_of_incandescent_lamps_for_indoor_lighting: null,
      count_of_incandescent_outdoor_lamps: null,
      technical_condition_of_the_external_power_supply_system: null,
      technical_condition_of_the_internal_power_supply_system: null,
      technical_condition_of_the_internal_power_supply_system_act: null,
      technical_condition_of_the_external_power_supply_system_act: null,
      power_supply_system_odnolinein_schema: null,
      power_supply_system_act_balance_razgranich: null,
      power_supply_system_scheme_balance_razgranich: null,
      power_supply_system_photo_vru: null,
    },
    loading: true,
  }),
  computed: {
    getPermission() {
      return this.$store.getters.permission <= 10
    }
  },
  methods: {
    async deleteDoc(filename) {
      try {
        if (this.data.[filename]) {
          await this.$store.dispatch('deleteEngineeringDoc', {id: this.data.id, doc_id: filename})
          this.data.[filename] = null
          this.$showMessage('deleteSuccess')
        } else this.$showMessage('error')
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
    onRejected() {
      this.$error('Файл слишком велик!')
    },
    async save() {
      try {
        if (this.other_organization) {
          this.data.power_supply_organization = this.other_organization
        }
        if (this.other_cable) {
          this.data.electric_cable_accessory = this.other_cable
        }

        const arrayNamesOFFiles = [
          'technical_condition_of_the_internal_power_supply_system_act',
          'technical_condition_of_the_external_power_supply_system_act',
          'power_supply_system_odnolinein_schema',
          'power_supply_system_scheme_balance_razgranich',
          'power_supply_system_photo_vru',
          'power_supply_system_act_balance_razgranich'

        ]
        const arrayNamesOfNumbers = [
          'required_power_supply_reliability_category',
          'actual_power_supply_reliability_category',
          'permitted_power',
          'count_of_energy_saving_lamps_for_indoor_lighting',
          'count_of_incandescent_lamps_for_indoor_lighting',
          'count_of_energy_saving_outdoor_lamps',
          'count_of_incandescent_outdoor_lamps'
        ]

        let form_data = new FormData();
        for (let key in this.data) {
          if (this.data[key] === null) {
            continue
          }
          if (arrayNamesOFFiles.includes(key) && typeof this.data[key] === 'string') {
            continue
          }
          if (arrayNamesOfNumbers.includes(key)) {
            this.data[key] = Number(this.data[key])
          }
          form_data.append(key, this.data[key]);
        }
        const resp = await this.$store.dispatch('sendEngineeringInfo', form_data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.other_organization = null
          this.other_cable = null
          this.changedInternalAct = false
          this.changedExternalAct = false
          this.changedBalanceAct = false
          this.changedBalanceScheme = false
          this.changedSchema = false
          this.changedPhoto = false
          await this.loadingPage()
        }
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    },
    showDoc(url) {
      const link = document.createElement('a');
      link.href = server_path + url;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
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
        const info = await this.$store.dispatch('fetchEngineering', {token, id})
        const tmp = Object.keys(this.data)
        for (let item in info) {
          if (tmp.includes(item)) {
            if (info[item] === '/media/null' || info[item] === 'null') {
              info[item] = null
            }
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

</style>