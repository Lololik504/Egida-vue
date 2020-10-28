<template>
  <div class="container">
    <h4>Добавление здания</h4>
    <form @submit.prevent="createBuild">
      <div class="q-pa-md">
        <div class="input-field-street">
          <label>Улица</label>
          <q-input outlined placeholder="Введите улицу" v-model="data.street"/>
        </div>
        <div class="input-field-street-number">
          <label>Номер дома</label>
          <q-input outlined placeholder="Введите номер дома" v-model="data.street_number"/>
        </div>
        <div class="select-type-field">
          <label>Вид здания</label>
          <div class="select">
            <q-select outlined v-model="data.type" :options="types"/>
          </div>
        </div>

        <div v-if="data.type === types[0]">
          <div class="select-purpose-field">
            <label>Назначение школы</label>
            <div class="select">
              <q-select outlined v-model="data.purpose" :options="purposes"/>
            </div>
            <div v-if="data.purpose === purposes[7]">
              <label>Введите назначение школы</label>
              <q-input outlined v-model="choose_purpose"/>
            </div>
            <div class="input-field-year">
              <label>Год постройки здания</label>
              <q-input outlined type="number" v-model.number="data.construction_year"
                       :class="{invalid: $v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)}"
                       @change="show"/>
              <span v-if="$v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)">в формате гггг(начиная от 1900 г, не ранее)</span>
            </div>
            <div class="input-field-building-square">
              <label>Площадь здания, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.building_square"/>
            </div>
            <div class="input-field-land-square">
              <label>Площадь земельного участка, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.land_square"/>
            </div>
            <div class="input-field-number-of-storeys">
              <label>Этажность здания</label>
              <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
            </div>
            <div class="input-field-build-height">
              <label>Высота здания (м)</label>
              <q-input outlined type="number" v-model.number="data.build_height"/>
            </div>
            <q-card flat bordered class="my-card">
              <label>Здания (помещения), сдаваемые в аренду или безвозмездное пользование:</label>
              <div class="input-field-arend-square">
                <label>Площадь, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.arend_square"/>
              </div>
              <div class="input-field-arend-use-type">
                <label>Вид использования</label>
                <q-input outlined type="text" v-model="data.arend_use_type"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Наполняемость:</label>
              <div class="input-field-occupancy-proj">
                <label>Проектная</label>
                <q-input outlined type="number" v-model.number="data.occupancy_proj"/>
              </div>
              <div class="input-field-arend-occupancy-fact">
                <label>Фактическая</label>
                <q-input outlined type="number" v-model.number="data.occupancy_fact"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Неиспользуемые здания (помещения):</label>
              <div class="input-field-unused-square">
                <label>Общая площадь, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.unused_square"/>
              </div>
              <div class="input-field-arend-repair-need-square">
                <label>Площадь, требующая ремонта, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.repair_need_square"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Общее техническое состояние здания:</label>
              <div class="q-pa-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Исправное состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Исправное состояние</q-item-label>
                      <q-item-label caption>категория технического состояния строительной конструкции или здания и
                        сооружения в целом, характеризующаяся отсутствием дефектов и повреждений, влияющих на снижение
                        несущей способности и эксплуатационной пригодности.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Работоспособное состояние"/>
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
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Ограниченно работоспособное состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                      <q-item-label caption>категория технического состояния здания или его строительных конструкций,
                        при которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей способности,
                        но отсутствует опасность внезапного разрушения и функционирование конструкции возможно при
                        контроле ее состояния, продолжительности и условий эксплуатации.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Недопустимое состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Недопустимое состояние</q-item-label>
                      <q-item-label caption>категория технического состояния строительной конструкции или здания и
                        сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                        характеристик, при котором существует опасность для пребывания людей и сохранности оборудования
                        (необходимо проведение страховочных мероприятий и усиление конструкций).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Аварийное состояние"/>
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
            </q-card>
            <br/>
            <div class="input-field-construction-year">
              <label>Год проведения последнего капитального ремонта/реконструкции здания</label>
              <q-input outlined type="number" v-model.number="data.last_repair_year"/>
            </div>
          </div>
        </div>

        <div v-else-if="data.type === types[1]">
          <div class="input-field-year">
            <label>Год постройки здания</label>
            <q-input outlined type="number" v-model.number="data.construction_year"
                   :class="{invalid: $v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)}"/>
            <span v-if="$v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)">в формате гггг(начиная от 1900 г, не ранее)</span>
          </div>
          <div class="input-field-building-square">
            <label>Площадь занимаемых помещений, Кв. м.</label>
            <q-input outlined type="number" v-model.number="data.building_square"/>
          </div>
          <div class="input-field-land-square">
            <label>Площадь земельного участка, Кв. м.</label>
            <q-input outlined type="number" v-model.number="data.land_square"/>
          </div>
          <div class="input-field-number-of-storeys">
            <label>Этажность всего здания</label>
            <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Наполняемость:</label>
            <div class="input-field-occupancy-proj">
              <label>Проектная</label>
              <q-input outlined type="number" v-model.number="data.occupancy_proj"/>
            </div>
            <div class="input-field-arend-occupancy-fact">
              <label>Фактическая</label>
              <q-input outlined type="number" v-model.number="data.occupancy_fact"/>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Неиспользуемые здания (помещения):</label>
            <div class="input-field-unused-square">
              <label>Общая площадь, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.unused_square"/>
            </div>
            <div class="input-field-arend-repair-need-square">
              <label>Площадь, требующая ремонта, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.repair_need_square"/>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние здания:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.TECHNICAL_CONDITION" val="Исправное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Исправное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся отсутствием дефектов и повреждений, влияющих на снижение
                      несущей способности и эксплуатационной пригодности.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.TECHNICAL_CONDITION" val="Работоспособное состояние"/>
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
                    <q-radio v-model="data.TECHNICAL_CONDITION" val="Ограниченно работоспособное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния здания или его строительных конструкций, при
                      которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей способности, но
                      отсутствует опасность внезапного разрушения и функционирование конструкции возможно при контроле
                      ее состояния, продолжительности и условий эксплуатации.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.TECHNICAL_CONDITION" val="Недопустимое состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Недопустимое состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                      характеристик, при котором существует опасность для пребывания людей и сохранности оборудования
                      (необходимо проведение страховочных мероприятий и усиление конструкций).
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="data.TECHNICAL_CONDITION" val="Аварийное состояние"/>
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
          </q-card>
          <br/>
          <div class="input-field-construction-year">
            <label>Год проведения последнего капитального ремонта/реконструкции здания</label>
            <q-input outlined type="number" v-model.number="data.last_repair_year"/>
          </div>
        </div>

        <div v-else-if="data.type === types[2]">
          <div class="select-purpose-field">
            <label>Назначение школы</label>
            <div class="select">
              <q-select outlined v-model="data.purpose" :options="purposes"/>
            </div>
            <div v-if="data.purpose === purposes[7]">
              <label>Введите назначение школы</label>
              <q-input outlined v-model="choose_purpose"/>
            </div>
            <div class="input-field-year">
              <label>Год пристройки здания</label>
              <q-input outlined type="number" v-model.number="data.construction_year"
                       :class="{invalid: $v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)}"
                       @change="show"/>
              <span v-if="$v.construction_year.$dirty && (!$v.construction_year.minValue || !$v.construction_year.maxValue)">в формате гггг(начиная от 1900 г, не ранее)</span>
            </div>
            <div class="input-field-building-square">
              <label>Площадь занимаемого помещения, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.building_square"/>
            </div>
            <div class="input-field-land-square">
              <label>Площадь земельного участка, Кв. м.</label>
              <q-input outlined type="number" v-model.number="data.land_square"/>
            </div>
            <div class="input-field-number-of-storeys">
              <label>Этажность пристройки</label>
              <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
            </div>
            <div class="input-field-build-height">
              <label>Высота пристройки (м)</label>
              <q-input outlined type="number" v-model.number="data.build_height"/>
            </div>
            <q-card flat bordered class="my-card">
              <label>Здания (помещения), сдаваемые в аренду или безвозмездное пользование:</label>
              <div class="input-field-arend-square">
                <label>Площадь, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.arend_square"/>
              </div>
              <div class="input-field-arend-use-type">
                <label>Вид использования</label>
                <q-input outlined type="text" v-model="data.arend_use_type"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Наполняемость:</label>
              <div class="input-field-occupancy-proj">
                <label>Проектная</label>
                <q-input outlined type="number" v-model.number="data.occupancy_proj"/>
              </div>
              <div class="input-field-arend-occupancy-fact">
                <label>Фактическая</label>
                <q-input outlined type="number" v-model.number="data.occupancy_fact"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Неиспользуемые здания (помещения):</label>
              <div class="input-field-unused-square">
                <label>Общая площадь, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.unused_square"/>
              </div>
              <div class="input-field-arend-repair-need-square">
                <label>Площадь, требующая ремонта, Кв. м.</label>
                <q-input outlined type="number" v-model.number="data.repair_need_square"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Общее техническое состояние здания:</label>
              <div class="q-pa-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Исправное состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Исправное состояние</q-item-label>
                      <q-item-label caption>категория технического состояния строительной конструкции или здания и
                        сооружения в целом, характеризующаяся отсутствием дефектов и повреждений, влияющих на снижение
                        несущей способности и эксплуатационной пригодности.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Работоспособное состояние"/>
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
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Ограниченно работоспособное состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                      <q-item-label caption>категория технического состояния здания или его строительных конструкций,
                        при которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей способности,
                        но отсутствует опасность внезапного разрушения и функционирование конструкции возможно при
                        контроле ее состояния, продолжительности и условий эксплуатации.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Недопустимое состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Недопустимое состояние</q-item-label>
                      <q-item-label caption>категория технического состояния строительной конструкции или здания и
                        сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                        характеристик, при котором существует опасность для пребывания людей и сохранности оборудования
                        (необходимо проведение страховочных мероприятий и усиление конструкций).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.TECHNICAL_CONDITION" val="Аварийное состояние"/>
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
            </q-card>
            <br/>
            <div class="input-field-construction-year">
              <label>Год проведения последнего капитального ремонта/реконструкции здания</label>
              <q-input outlined type="number" v-model.number="data.last_repair_year"/>
            </div>
          </div>
        </div>
        <div class="b">
        <q-btn color="primary" label="Сохранить" type="submit"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {minValue, maxValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    data: {},
    types: ["Отдельно стоящее","Встроенное в многоквартирный дом","Пристроенное к многоквартирному дому"],
    purposes: ['Корпус школы', 'Корпус д/с', 'Подразделение доп. образования', 'Овощехранилище', 'Мастерская', 'Теплица', 'Гараж', 'Иное'],
    // street: null,
    // street_number: null,
    // unused_square: null,
    // TECHNICAL_CONDITION: null,
    // repair_need_square: null,
    // occupancy_proj: null,
    // occupancy_fact: null,
    // arend_square: null,
    // construction_year: null,
    // arend_use_type: null,
    // land_square: null,
    // number_of_storeys: null,
    // building_square: null,
    // build_height: null,
    // type: null,
    // purpose: null,
    choose_purpose: null,
    current: null,
    loading: true,

  }),
  validations: {
    construction_year: {
      minValue: minValue(1900),
      maxValue: maxValue(new Date().getFullYear())
    }
  },
  name: 'CreateBuilding',
  methods: {
    show() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        console.log(new Date().getFullYear())
        return
      }
    },
    async createBuild(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.choose_purpose !== null) {
        this.data.purpose = this.choose_purpose
      }
      // const dataForm = {
      //   street: this.street,
      //   street_number: this.street_number,
      //   unused_square: this.unused_square,
      //   TECHNICAL_CONDITION: this.TECHNICAL_CONDITION,
      //   repair_need_square: this.repair_need_square,
      //   occupancy_proj: this.occupancy_proj,
      //   occupancy_fact: this.occupancy_proj,
      //   arend_square: this.arend_square,
      //   construction_year: this.construction_year,
      //   arend_use_type: this.arend_use_type,
      //   land_square: this.land_square,
      //   number_of_storeys: this.number_of_storeys,
      //   building_square: this.building_square,
      //   build_height: this.build_height,
      //   type: this.type,
      //   purpose: this.purpose,
      //   last_repair_year: this.last_repair_year,
      //   age: this.age,
      //   INN: this.$route.params['build']
      // }
      let dataForm = Object.assign({},this.data)
      dataForm['INN'] = this.$route.params['build']
      try {
        await this.$store.dispatch('createBuilding',dataForm)
      } catch (e) {
        console.log(e)
        alert('Произошла ошибка!')
        return
      }
      await this.$router.push(`/schoolbuilding/${this.$route.params['build']}`)
    }
  },
  async mounted() {
    try {
      const resp = await this.$store.dispatch('fetchFieldsBuilding')
      this.data = Object.assign({},resp)
      Object.keys(this.data).forEach(key => (this.data[key] = null))
    } catch (e) {
      console.log(e)
    }

  },
  created() {
    this.current = this.types[0]
  }
}
</script>

<style scoped>
.select {
  margin-bottom: 1px;
}
</style>