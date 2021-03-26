<template>
  <div class="container">
    <Loader v-if="loading"/>
    <form v-else>
      <h4>Информация о здании
        <router-link :to="`/buildingcard/${this.$route.params['id']}`"> {{
            d.street + ', ' + d.street_number
          }}
        </router-link>
      </h4>
      <div class="q-pa-md">
        <div class="input-field-street">
          <label>Улица</label>
          <q-input outlined placeholder="Введите улицу" v-model="$v.d.street.$model"
                   :disable="disable"
                   :class="{invalid: (!$v.d.street.required && $v.d.street.$dirty)}"
                   :error-message="!$v.d.street.required && $v.d.street.$dirty ? 'Поле не должно быть пустым': ''"
                   :error="(!$v.d.street.required && $v.d.street.$dirty)"
          />
        </div>
        <div class="input-field-street-number">
          <label>Номер дома</label>
          <q-input outlined placeholder="Введите номер дома" type="number" v-model="$v.d.street_number.$model"
                   :disable="disable"
                   :class="{invalid: (!$v.d.street_number.required && $v.d.street_number.$dirty)}"
                   :error-message="!$v.d.street_number.required && $v.d.street_number.$dirty ? 'Поле не должно быть пустым': ''"
                   :error="(!$v.d.street_number.required && $v.d.street_number.$dirty)"
          />
        </div>
        <div class="select-type-field">
          <label>Вид здания</label>
          <div class="select">
            <q-select outlined :disable="disable" v-model="d.type" :options="types"/>
          </div>
        </div>

        <div v-if="d.type === types[0]">
          <div class="select-purpose-field">
            <label>Назначение школы</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="d.purpose" :options="purposes"/>
            </div>
            <div v-if="!purposes.includes(d.purpose) || d.purpose === purposes[7]">
              <label>Введите назначение школы</label>
              <q-input outlined :disable="disable" v-model="d.purpose"/>
            </div>
            <div class="input-field-year">
              <label>Год постройки здания</label>
              <q-input
                  ref="y"
                  outlined
                  :disable="disable"
                  v-model.number="d.construction_year"
                  placeholder="гггг"
                  type="tel"
                  hint="в формате гггг(начиная от 1900 г, не ранее)"
                  mask="####"
                  unmasked-value
                  :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
              />
            </div>
            <div class="input-field-building-square">
              <label>Площадь здания, Кв. м.</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.building_square"/>
            </div>
            <div class="input-field-land-square">
              <label>Площадь земельного участка, Кв. м.</label>
              <q-input outlined :disable="disable"  step="0.001" type="number" v-model.number="d.land_square"/>
            </div>
            <div class="input-field-number-of-storeys">
              <label>Этажность здания</label>
              <q-input outlined :disable="disable" type="number" v-model.number="d.number_of_storeys"/>
            </div>
            <div class="input-field-build-height">
              <label>Высота здания (м)</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.build_height"/>
            </div>
            <q-card flat bordered class="my-card">
              <label>Здания (помещения), сдаваемые в аренду или безвозмездное пользование:</label>
              <div class="input-field-arend-square">
                <label>Площадь, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.arend_square"/>
              </div>
              <div class="input-field-arend-use-type">
                <label>Вид использования</label>
                <q-input outlined :disable="disable" step="0.001" type="text" v-model="d.arend_use_type"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Наполняемость:</label>
              <div class="input-field-occupancy-proj">
                <label>Проектная</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.occupancy_proj"/>
              </div>
              <div class="input-field-arend-occupancy-fact">
                <label>Фактическая</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.occupancy_fact"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Неиспользуемые здания (помещения):</label>
              <div class="input-field-unused-square">
                <label>Общая площадь, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.unused_square"/>
              </div>
              <div class="input-field-arend-repair-need-square">
                <label>Площадь, требующая ремонта, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.repair_need_square"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Общее техническое состояние здания:</label>
              <div class="q-pa-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Исправное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Работоспособное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition"
                               val="Ограниченно работоспособное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Недопустимое состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Аварийное состояние"/>
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
              <q-input outlined
                       :disable="disable"
                       v-model.number="d.last_repair_year"
                       placeholder="гггг"
                       type="tel"
                       hint="(если не было кап.ремонта или реконструкции, то оставлять год постройки)"
                       mask="####"
                       ref="year"
                       unmasked-value
                       :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
              />
            </div>
          </div>
        </div>

        <div v-else-if="d.type === types[1]">
          <div class="input-field-year">
            <label>Год постройки здания</label>
            <q-input
                ref="y"
                outlined
                :disable="disable"
                v-model.number="d.construction_year"
                placeholder="гггг"
                type="tel"
                hint="в формате гггг(начиная от 1900 г, не ранее)"
                mask="####"
                unmasked-value
                :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
          <div class="input-field-building-square">
            <label>Площадь занимаемых помещений, Кв. м.</label>
            <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.building_square"/>
          </div>
          <div class="input-field-land-square">
            <label>Площадь земельного участка, Кв. м.</label>
            <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.land_square"/>
          </div>
          <div class="input-field-number-of-storeys">
            <label>Этажность всего здания</label>
            <q-input outlined :disable="disable" type="number" v-model.number="d.number_of_storeys"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Наполняемость:</label>
            <div class="input-field-occupancy-proj">
              <label>Проектная</label>
              <q-input outlined :disable="disable" type="number" v-model.number="d.occupancy_proj"/>
            </div>
            <div class="input-field-arend-occupancy-fact">
              <label>Фактическая</label>
              <q-input outlined :disable="disable" type="number" v-model.number="d.occupancy_fact"/>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Неиспользуемые здания (помещения):</label>
            <div class="input-field-unused-square">
              <label>Общая площадь, Кв. м.</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.unused_square"/>
            </div>
            <div class="input-field-arend-repair-need-square">
              <label>Площадь, требующая ремонта, Кв. м.</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.repair_need_square"/>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние здания:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="d.technical_condition" val="Исправное состояние"/>
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
                    <q-radio :disable="disable" v-model="d.technical_condition" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="d.technical_condition"
                             val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="d.technical_condition" val="Недопустимое состояние"/>
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
                    <q-radio :disable="disable" v-model="d.technical_condition" val="Аварийное состояние"/>
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
            <q-input outlined
                     :disable="disable"
                     v-model.number="d.last_repair_year"
                     placeholder="гггг"
                     type="tel"
                     hint="(если не было кап.ремонта или реконструкции, то оставлять год постройки)"
                     mask="####"
                     ref="year"
                     unmasked-value
                     :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
            />
          </div>
        </div>
        <div v-else-if="d.type === types[2]">
          <div class="select-purpose-field">
            <label>Назначение школы</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="d.purpose" :options="purposes"/>
            </div>
            <div v-if="!purposes.includes(d.purpose) || d.purpose === purposes[7]">
              <label>Введите назначение школы</label>
              <q-input outlined :disable="disable" v-model="d.purpose"/>
            </div>
            <div class="input-field-year">
              <label>Год пристройки здания</label>
              <q-input
                  ref="y"
                  outlined
                  :disable="disable"
                  v-model.number="d.construction_year"
                  placeholder="гггг"
                  type="tel"
                  hint="в формате гггг(начиная от 1900 г, не ранее)"
                  mask="####"
                  unmasked-value
                  :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
              />
            </div>
            <div class="input-field-building-square">
              <label>Площадь занимаемого помещения, Кв. м.</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.building_square"/>
            </div>
            <div class="input-field-land-square">
              <label>Площадь земельного участка, Кв. м.</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.land_square"/>
            </div>
            <div class="input-field-number-of-storeys">
              <label>Этажность пристройки</label>
              <q-input outlined :disable="disable" type="number" v-model.number="d.number_of_storeys"/>
            </div>
            <div class="input-field-build-height">
              <label>Высота пристройки (м)</label>
              <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.build_height"/>
            </div>
            <q-card flat bordered class="my-card">
              <label>Здания (помещения), сдаваемые в аренду или безвозмездное пользование:</label>
              <div class="input-field-arend-square">
                <label>Площадь, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.arend_square"/>
              </div>
              <div class="input-field-arend-use-type">
                <label>Вид использования</label>
                <q-input outlined :disable="disable"  type="text" v-model="d.arend_use_type"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Наполняемость:</label>
              <div class="input-field-occupancy-proj">
                <label>Проектная</label>
                <q-input outlined :disable="disable" type="number" v-model.number="d.occupancy_proj"/>
              </div>
              <div class="input-field-arend-occupancy-fact">
                <label>Фактическая</label>
                <q-input outlined :disable="disable" type="number" v-model.number="d.occupancy_fact"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Неиспользуемые здания (помещения):</label>
              <div class="input-field-unused-square">
                <label>Общая площадь, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.unused_square"/>
              </div>
              <div class="input-field-arend-repair-need-square">
                <label>Площадь, требующая ремонта, Кв. м.</label>
                <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="d.repair_need_square"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Общее техническое состояние здания:</label>
              <div class="q-pa-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Исправное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Работоспособное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition"
                               val="Ограниченно работоспособное состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Недопустимое состояние"/>
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
                      <q-radio :disable="disable" v-model="d.technical_condition" val="Аварийное состояние"/>
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
              <q-input outlined
                       :disable="disable"
                       v-model.number="d.last_repair_year"
                       placeholder="гггг"
                       type="tel"
                       hint="(если не было кап.ремонта или реконструкции, то оставлять год постройки)"
                       mask="####"
                       ref="year"
                       unmasked-value
                       :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
              />
            </div>
          </div>
        </div>
        <div class="q-gutter-md">
          <button class="btn waves-effect waves-light" @click.prevent="disable = false" v-if="disable">
            Редактирование
          </button>
          <button class="btn waves-effect waves-light" @click.prevent="updateBuild" v-if="!disable">
            Изменить
          </button>
          <button class="btn waves-effect waves-light" @click.prevent="disable = true" v-if="!disable">
            Отменить
          </button>
          <button class="btn waves-effect waves-light" @click.prevent="deleteBuilding">
            Удалить здание
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {maxValue, minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'
import messages from "@/utils/messages";

export default {
  data: () => ({
    types: ["Отдельно стоящее", "Встроенное в многоквартирный дом", "Пристроенное к многоквартирному дому"],
    purposes: ['Корпус школы', 'Корпус д/с', 'Подразделение доп. образования', 'Овощехранилище', 'Мастерская', 'Теплица', 'Гараж', 'Иное'],
    loading: true,
    disable: true,
    d: {
      street: null,
      street_number: null,
      unused_square: null,
      technical_condition: null,
      repair_need_square: null,
      occupancy_proj: null,
      occupancy_fact: null,
      arend_square: null,
      construction_year: null,
      arend_use_type: null,
      land_square: null,
      number_of_storeys: null,
      building_square: null,
      build_height: null,
      type: null,
      purpose: null,
      choose_purpose: null,
      age: null,
      last_repair_year: null,
      id: null
    }
  }),
  validations: {
    construction_year: {
      minValue: minValue(1900),
      maxValue: maxValue(new Date().getFullYear())
    },
    d: {
      street: {
        required
      },
      street_number: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async updateBuild() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        this.d.id = this.$route.params['id']
        const dataForm = Object.assign({}, this.d)
        await this.$store.dispatch('updateBuilding', dataForm)
        await this.$router.push(`/schoolbuilding/${localStorage.getItem('currentINN')}`)
        this.showMessage('saveSuccess');
      } catch (e) {
        console.log(e)
      }
    },
    showMessage(text) {
      if (messages[text]) {
        window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    },
    async deleteBuilding() {
      try {
        const isConfirmed = confirm('Удалить данное здание?')
        if (isConfirmed) {
          const id = this.$route.params['id']
          await this.$store.dispatch('deleteBuilding', id)
          await this.$router.push(`/schoolbuilding/${localStorage.getItem('currentINN')}`)
          this.showMessage('deleteSuccess');
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const id = this.$route.params['id']
      this.d = await this.$store.dispatch('fetchBuilding', {token, id})
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>