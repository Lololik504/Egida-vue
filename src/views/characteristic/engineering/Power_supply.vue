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
              <q-select outlined v-model="power_supply_organization" :options="organizations"/>
            </div>
          </div>
          <div v-if="power_supply_organization === organizations[1]">
            <label>Введите иную энергоснабжающую организацию</label>
            <q-input outlined v-model="other_organization"/>
          </div>
          <div class="select-type-field">
            <label>Принадлежность электрокабеля</label>
            <div class="select">
              <q-select outlined v-model="electric_cable_accessory" :options="cables"/>
            </div>
          </div>
          <div v-if="electric_cable_accessory === cables[11]">
            <label>Введите принадлежность электрокабеля</label>
            <q-input outlined v-model="other_cable"/>
          </div>
          <h5><strong>Категории надежности электроснабжения</strong></h5>
          <div class="row">
            <div class="col">
              <label>Фактическая</label>
              <q-input outlined type="number" v-model.number="actual_power_supply_reliability_category"/>
            </div>
            <div class="col">
              <label>Требуемая</label>
              <q-input outlined type="number" v-model.number="required_power_supply_reliability_category"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие резервных источников электропитания</label>
            <div class="select">
              <q-select outlined v-model="availability_of_backup_power_supplies" :options="reserve_sources"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Разрешенная мощность, кВт</label>
            <q-input outlined type="number" v-model.number="permitted_power"/>
          </div>
          <div class="select-type-field">
            <label>Наличие контура заземления</label>
            <div class="select">
              <q-select outlined v-model="ground_loop" :options="conturs"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Количество энергосберегающих ламп внутреннего освещения, шт</label>
            <q-input outlined type="number" v-model.number="count_of_energy_saving_lamps_for_indoor_lighting"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество ламп накаливания внутреннего освещения, шт</label>
            <q-input outlined type="number" v-model.number="count_of_incandescent_lamps_for_indoor_lighting"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество энергосберегающих ламп наружного освещения, шт</label>
            <q-input outlined type="number" v-model.number="count_of_energy_saving_outdoor_lamps"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество ламп накаливания наружного освещения, шт</label>
            <q-input outlined type="number" v-model.number="count_of_incandescent_outdoor_lamps"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы внутреннего электроснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="technical_condition_of_the_internal_power_supply_system" val="Работоспособное состояние"/>
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
                    <q-radio v-model="technical_condition_of_the_internal_power_supply_system" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio v-model="technical_condition_of_the_internal_power_supply_system" val="Аварийное состояние"/>
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
                  v-model="act_inside"
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
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы наружного электроснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="technical_condition_of_the_external_power_supply_system" val="Работоспособное состояние"/>
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
                    <q-radio v-model="technical_condition_of_the_external_power_supply_system" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio v-model="technical_condition_of_the_external_power_supply_system" val="Аварийное состояние"/>
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
                  v-model="act_outside"
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
<!--          <h5><strong>Документация</strong></h5>-->
<!--          <div class="row">-->
<!--            <div class="col">-->
<!--              <label>Акт балансового разграничени</label>-->
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
<!--              <label>Однолинейная схема</label>-->
<!--              <q-file-->
<!--                  v-model="schemaDoc"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <label>Фото ВРУ</label>-->
<!--              <q-file-->
<!--                  v-model="photo"-->
<!--                  outlined-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
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
  name: "Power_supply",
  data: () => ({
    organizations: ['Новосибирскэнергосбыт', 'Иное'],
    power_supply_organization: null,
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
    electric_cable_accessory: null,
    other_cable: null,
    actual_power_supply_reliability_category: null,
    required_power_supply_reliability_category: null,
    reserve_sources: [
        'Источник бесперебойного питания',
        'Дизель-генераторное устройство',
        'Резервный кабель'
    ],
    availability_of_backup_power_supplies: null,
    permitted_power: null,
    conturs: ['Имеется', 'Отсутствует'],
    ground_loop: null,
    count_of_energy_saving_lamps_for_indoor_lighting: null,
    count_of_energy_saving_outdoor_lamps: null,
    count_of_incandescent_lamps_for_indoor_lighting: null,
    count_of_incandescent_outdoor_lamps: null,
    technical_condition_of_the_external_power_supply_system: null,
    technical_condition_of_the_internal_power_supply_system: null,
    act_inside: null,
    act_outside: null,
    schemaDoc: null,
    balanceActDoc: null,
    balanceSchemaDoc: null,
    photo: null,
    loading: false,
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
          this.power_supply_organization = this.other_organization
        }
        if (this.other_cable) {
          this.electric_cable_accessory = this.other_cable
        }
        if (this.ground_loop) {
          this.ground_loop === 'Имеется' ? this.ground_loop = true : this.ground_loop = false
        }
        const data = {
          power_supply_organization: this.power_supply_organization,
          electric_cable_accessory: this.electric_cable_accessory,
          actual_power_supply_reliability_category: this.actual_power_supply_reliability_category,
          required_power_supply_reliability_category: this.required_power_supply_reliability_category,
          availability_of_backup_power_supplies: this.availability_of_backup_power_supplies,
          permitted_power: this.permitted_power,
          ground_loop: this.ground_loop,
          count_of_energy_saving_lamps_for_indoor_lighting: this.count_of_energy_saving_lamps_for_indoor_lighting,
          count_of_energy_saving_outdoor_lamps: this.count_of_energy_saving_outdoor_lamps,
          count_of_incandescent_lamps_for_indoor_lighting: this.count_of_incandescent_lamps_for_indoor_lighting,
          count_of_incandescent_outdoor_lamps: this.count_of_incandescent_outdoor_lamps,
          technical_condition_of_the_external_power_supply_system: this.technical_condition_of_the_external_power_supply_system,
          technical_condition_of_the_internal_power_supply_system: this.technical_condition_of_the_internal_power_supply_system,
          id: this.$route.params['id']
        }
        const resp = await this.$store.dispatch('sendEngineeringInfo', data)
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
      const info = await this.$store.dispatch('fetchEngineering', {token, id})
      console.log(info)
      this.power_supply_organization = info['power_supply_organization']
      this.electric_cable_accessory = info['electric_cable_accessory']
      this.actual_power_supply_reliability_category = info['actual_power_supply_reliability_category']
      this.required_power_supply_reliability_category = info['required_power_supply_reliability_category']
      this.permitted_power = info['permitted_power']
      this.availability_of_backup_power_supplies = info['availability_of_backup_power_supplies']
      info['ground_loop'] === true ? this.ground_loop = 'Имеется' : info['ground_loop'] !== null ? this.ground_loop = 'Отсутствует' : this.ground_loop = null
      this.count_of_energy_saving_lamps_for_indoor_lighting = info['count_of_energy_saving_lamps_for_indoor_lighting']
      this.count_of_energy_saving_outdoor_lamps = info['count_of_energy_saving_outdoor_lamps']
      this.count_of_incandescent_lamps_for_indoor_lighting = info['count_of_incandescent_lamps_for_indoor_lighting']
      this.count_of_incandescent_outdoor_lamps = info['count_of_incandescent_outdoor_lamps']
      this.technical_condition_of_the_external_power_supply_system = info['technical_condition_of_the_external_power_supply_system']
      this.technical_condition_of_the_internal_power_supply_system = info['technical_condition_of_the_internal_power_supply_system']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>