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
              <q-select outlined v-model="organization" :options="organizations"/>
            </div>
          </div>
          <div v-if="organization === organizations[2]">
            <label>Введите иную энергоснабжающую организацию</label>
            <q-input outlined v-model="other_organization"/>
          </div>
          <div class="select-type-field">
            <label>Тип теплового пункта</label>
            <div class="select">
              <q-select outlined v-model="type" :options="types"/>
            </div>
          </div>
          <div class="input-field-year">
            <label>Год ввода в эксплуатацию ИТП</label>
            <q-input outlined v-model.number="year_ITP"
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
          <div class="input-field-year">
            <label>Год принятия на баланс или техобслуживание</label>
            <q-input outlined v-model.number="year_access"
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
            <label>Источник теплоснабжения</label>
            <div class="select">
              <q-select outlined v-model="warm_source" :options="warm_sources"/>
            </div>
          </div>
          <div v-if="warm_source === warm_sources[6]">
            <label>Введите иной источник теплоснабжения</label>
            <q-input outlined v-model="other_warm_source"/>
          </div>
          <div class="input-field-roof-square">
            <label>Питание от камеры №</label>
            <q-input outlined v-model="cam_power"/>
          </div>
          <div class="input-field-roof-square">
            <label>Питание от магистрали №</label>
            <q-input outlined v-model="mag_power"/>
          </div>
          <div class="select-type-field">
            <label>Граница эксплуатационной ответственности</label>
            <div class="select">
              <q-select outlined v-model="border" :options="borders"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Схема подключение горячего водоснабжения</label>
            <div class="select">
              <q-select outlined v-model="schema" :options="schemas"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип присоединения системы отопления</label>
            <div class="select">
              <q-select outlined v-model="schema_type" :options="schema_types"/>
            </div>
          </div>
          <div class="input-field-mask">
            <label>Температурный график</label>
            <q-input outlined v-model.number="temperature"
                     hint="ввод цифрами в формате ххх/хx"
                     mask="###/##"
            />
          </div>
          <div class="select-type-field">
            <label>Тип разводки системы отопления</label>
            <div class="select">
              <q-select outlined v-model="wiring_type" :options="wiring_types"/>
            </div>
          </div>
          <h5><strong>Тепловые нагрузки</strong></h5>
          <div class="row">
            <div class="col">
              <label>Отопление</label>
              <q-input outlined type="number" v-model.number="heating"/>
            </div>
            <div class="col">
              <label>Горячее водоснабжение</label>
              <q-input outlined type="number" v-model.number="water_supply"/>
            </div>
            <div class="col">
              <label>Вентиляция</label>
              <q-input outlined type="number" v-model.number="ventilation"/>
            </div>
            <div class="col">
              <label>Суммарная</label>
              <q-input outlined type="number" v-model.number="total"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования тепла</label>
            <q-input outlined type="number" v-model="count_warm_system"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования приточной установки</label>
            <q-input outlined type="number" v-model="count_water_system"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы отопления:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status_heating" val="Работоспособное состояние"/>
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
                    <q-radio v-model="status_heating" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio v-model="status_heating" val="Аварийное состояние"/>
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
                  v-model="act_heating"
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
            <label>Техническое состояние системы вентиляции:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status_ventilation" val="Работоспособное состояние"/>
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
                    <q-radio v-model="status_ventilation" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio v-model="status_ventilation" val="Аварийное состояние"/>
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
                  v-model="act_ventilation"
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
            <label>Техническое состояние системы горячего водоснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status_water_supply" val="Работоспособное состояние"/>
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
                    <q-radio v-model="status_water_supply" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio v-model="status_water_supply" val="Аварийное состояние"/>
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
                  v-model="act_water_supply"
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
          <h5><strong>Документация</strong></h5>
          <div class="row">
            <div class="col">
              <label>Паспорт ввода</label>
              <q-file
                  v-model="inputPassportDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Схема ввода</label>
              <q-file
                  v-model="inputSchemaDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Паспорт ИТП</label>
              <q-file
                  v-model="passportITPDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Схема ИТП</label>
              <q-file
                  v-model="schemaITPDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Акт балансового разграничения</label>
              <q-file
                  v-model="balanceActDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Схема балансового разграничения</label>
              <q-file
                  v-model="balanceSchemaDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Справка о тепловых нагрузках</label>
              <q-file
                  v-model="referenceDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Расчет тепловых потерь</label>
              <q-file
                  v-model="paymentDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
            <div class="col">
              <label>Топоснова</label>
              <q-file
                  v-model="toposnovaDoc"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
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
export default {
  name: "Heat_supply",
  data: () => ({
    organizations: ['ООО Сибирская генерирующая компания', 'ФГУП УЭВ', 'Иное'],
    organization: null,
    other_organization: null,
    types: ['Отдельно стоящий', 'Пристроенный', 'Встроенный в здание'],
    type: null,
    year_ITP: null,
    year_access: null,
    warm_sources: [
      'ТЭЦ-1',
      'ТЭЦ-2',
      'ТЭЦ-3',
      'ТЭЦ-4',
      'ТЭЦ-5',
      'КРК',
      'Иное'
    ],
    warm_source: null,
    other_warm_source: null,
    cam_power: null,
    mag_power: null,
    borders: ['Стена здания', 'Точка врезки', 'Прочее'],
    border: null,
    schemas: ['Отдельный ввод с циркуляцией',
      'Отдельный ввод без циркуляции',
      'Собственная водоподогревательная установка',
      'Открытая схема'
    ],
    schema: null,
    schema_types: [
      'Элеваторное',
      'Насосное (САРТ)',
      'Непосредственное (с установкой дроссельной шайбы на вводе)',
      'Независимое (с установкой водоподогревательной установки отопления)'
    ],
    schema_type: null,
    wiring_types: [
      'Верхний розлив',
      'Нижний розлив'
    ],
    wiring_type: null,
    temperature: null,
    heating: null,
    water_supply: null,
    ventilation: null,
    total: null,
    count_warm_system: null,
    count_water_system: null,
    status_heating: null,
    act_heating: null,
    status_ventilation: null,
    act_ventilation: null,
    status_water_supply: null,
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
      console.log(this.status)
    }
  }
}
</script>

<style scoped>

</style>