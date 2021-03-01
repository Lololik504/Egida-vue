<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Добавление здания</h4>
      <form @submit.prevent="createBuild">
        <div class="q-pa-md">
          <div class="input-field-street">
            <label>Улица</label>
            <q-input outlined placeholder="Введите улицу" v-model="$v.data.street.$model"
                     :class="{invalid: (!$v.data.street.required && $v.data.street.$dirty)}"
                     :error-message="!$v.data.street.required && $v.data.street.$dirty ? 'Поле не должно быть пустым': ''"
                     :error="(!$v.data.street.required && $v.data.street.$dirty)"
            />
          </div>
          <div class="input-field-street-number">
            <label>Номер дома</label>
            <q-input outlined placeholder="Введите номер дома" v-model="$v.data.street_number.$model"
                     :class="{invalid: (!$v.data.street_number.required && $v.data.street_number.$dirty)}"
                     :error-message="!$v.data.street_number.required && $v.data.street_number.$dirty ? 'Поле не должно быть пустым': ''"
                     :error="(!$v.data.street_number.required && $v.data.street_number.$dirty)"
            />
          </div>
          <div class="select-type-field">
            <label>Вид здания</label>
            <div class="select">
              <q-select outlined v-model="data.type" :options="types"/>
            </div>
          </div>

          <div v-if="data.type === types[0]">
            <div class="select-purpose-field">
              <label>Назначение здания</label>
              <div class="select">
                <q-select outlined v-model="data.purpose" :options="purposes"/>
              </div>
              <div v-if="data.purpose === purposes[7]">
                <label>Введите назначение здания</label>
                <q-input outlined v-model="choose_purpose"/>
              </div>
              <div class="input-field-year">
                <label>Год постройки здания</label>
                <q-input ref="y"
                         outlined
                         v-model.number="data.construction_year"
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
                <q-input outlined type="number" step="0.001" v-model.number="data.building_square"/>
              </div>
              <div class="input-field-land-square">
                <label>Площадь земельного участка, Кв. м.</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.land_square"/>
              </div>
              <div class="input-field-number-of-storeys">
                <label>Этажность здания</label>
                <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
              </div>
              <div class="input-field-build-height">
                <label>Высота здания (м)</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.build_height"/>
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
                  <q-input outlined type="number" step="0.001" v-model.number="data.unused_square"/>
                </div>
                <div class="input-field-arend-repair-need-square">
                  <label>Площадь, требующая ремонта, Кв. м.</label>
                  <q-input outlined type="number" step="0.001" v-model.number="data.repair_need_square"/>
                </div>
              </q-card>
              <br/>
              <q-card flat bordered class="my-card">
                <label>Общее техническое состояние здания:</label>
                <div class="q-pa-md">
                  <q-list>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="data.technical_condition" val="Исправное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Работоспособное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Ограниченно работоспособное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Недопустимое состояние"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Недопустимое состояние</q-item-label>
                        <q-item-label caption>категория технического состояния строительной конструкции или здания и
                          сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                          характеристик, при котором существует опасность для пребывания людей и сохранности
                          оборудования
                          (необходимо проведение страховочных мероприятий и усиление конструкций).
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="data.technical_condition" val="Аварийное состояние"/>
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
                <q-input outlined v-model.number="data.last_repair_year"
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

          <div v-else-if="data.type === types[1]">
            <div class="input-field-year">
              <label>Год постройки здания</label>
              <q-input outlined v-model.number="data.construction_year"
                       placeholder="гггг"
                       type="tel"
                       hint="в формате гггг(начиная от 1900 г, не ранее)"
                       mask="####"
                       ref="year"
                       unmasked-value
                       :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
              />

            </div>
            <div class="input-field-building-square">
              <label>Площадь занимаемых помещений, Кв. м.</label>
              <q-input outlined type="number" step="0.001" v-model.number="data.building_square"/>
            </div>
            <div class="input-field-land-square">
              <label>Площадь земельного участка, Кв. м.</label>
              <q-input outlined type="number" step="0.001" v-model.number="data.land_square"/>
            </div>
            <div class="input-field-number-of-storeys">
              <label>Этажность всего здания</label>
              <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
            </div>
            <q-card flat bordered class="my-card">
              <label>Наполняемость:</label>
              <div class="input-field-occupancy-proj">
                <label>Проектная</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.occupancy_proj"/>
              </div>
              <div class="input-field-arend-occupancy-fact">
                <label>Фактическая</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.occupancy_fact"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Неиспользуемые здания (помещения):</label>
              <div class="input-field-unused-square">
                <label>Общая площадь, Кв. м.</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.unused_square"/>
              </div>
              <div class="input-field-arend-repair-need-square">
                <label>Площадь, требующая ремонта, Кв. м.</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.repair_need_square"/>
              </div>
            </q-card>
            <br/>
            <q-card flat bordered class="my-card">
              <label>Общее техническое состояние здания:</label>
              <div class="q-pa-md">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.technical_condition" val="Исправное состояние"/>
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
                      <q-radio v-model="data.technical_condition" val="Работоспособное состояние"/>
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
                      <q-radio v-model="data.technical_condition" val="Ограниченно работоспособное состояние"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                      <q-item-label caption>категория технического состояния здания или его строительных конструкций,
                        при
                        которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей способности, но
                        отсутствует опасность внезапного разрушения и функционирование конструкции возможно при контроле
                        ее состояния, продолжительности и условий эксплуатации.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-radio v-model="data.technical_condition" val="Недопустимое состояние"/>
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
              <q-input outlined v-model.number="data.last_repair_year"
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

          <div v-else-if="data.type === types[2]">
            <div class="select-purpose-field">
              <label>Назначение здания</label>
              <div class="select">
                <q-select outlined v-model="data.purpose" :options="purposes"/>
              </div>
              <div v-if="data.purpose === purposes[7]">
                <label>Введите назначение здания</label>
                <q-input outlined v-model="choose_purpose"/>
              </div>
              <div class="input-field-year">
                <label>Год пристройки здания</label>
                <q-input outlined v-model.number="data.construction_year"
                         placeholder="гггг"
                         type="tel"
                         hint="в формате гггг(начиная от 1900 г, не ранее)"
                         mask="####"
                         ref="year"
                         unmasked-value
                         :rules="[val => val > 1899 && val <= new Date().getFullYear() || 'начиная от 1900 г, не ранее, до текущего']"
                />

              </div>
              <div class="input-field-building-square">
                <label>Площадь занимаемого помещения, Кв. м.</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.building_square"/>
              </div>
              <div class="input-field-land-square">
                <label>Площадь земельного участка, Кв. м.</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.land_square"/>
              </div>
              <div class="input-field-number-of-storeys">
                <label>Этажность пристройки</label>
                <q-input outlined type="number" v-model.number="data.number_of_storeys"/>
              </div>
              <div class="input-field-build-height">
                <label>Высота пристройки (м)</label>
                <q-input outlined type="number" step="0.001" v-model.number="data.build_height"/>
              </div>
              <q-card flat bordered class="my-card">
                <label>Здания (помещения), сдаваемые в аренду или безвозмездное пользование:</label>
                <div class="input-field-arend-square">
                  <label>Площадь, Кв. м.</label>
                  <q-input outlined type="number" step="0.001" v-model.number="data.arend_square"/>
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
                  <q-input outlined type="number" step="0.001" v-model.number="data.occupancy_proj"/>
                </div>
                <div class="input-field-arend-occupancy-fact">
                  <label>Фактическая</label>
                  <q-input outlined type="number" step="0.001" v-model.number="data.occupancy_fact"/>
                </div>
              </q-card>
              <br/>
              <q-card flat bordered class="my-card">
                <label>Неиспользуемые здания (помещения):</label>
                <div class="input-field-unused-square">
                  <label>Общая площадь, Кв. м.</label>
                  <q-input outlined type="number" step="0.001" v-model.number="data.unused_square"/>
                </div>
                <div class="input-field-arend-repair-need-square">
                  <label>Площадь, требующая ремонта, Кв. м.</label>
                  <q-input outlined type="number" step="0.001" v-model.number="data.repair_need_square"/>
                </div>
              </q-card>
              <br/>
              <q-card flat bordered class="my-card">
                <label>Общее техническое состояние здания:</label>
                <div class="q-pa-md">
                  <q-list>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="data.technical_condition" val="Исправное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Работоспособное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Ограниченно работоспособное состояние"/>
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
                        <q-radio v-model="data.technical_condition" val="Недопустимое состояние"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Недопустимое состояние</q-item-label>
                        <q-item-label caption>категория технического состояния строительной конструкции или здания и
                          сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                          характеристик, при котором существует опасность для пребывания людей и сохранности
                          оборудования
                          (необходимо проведение страховочных мероприятий и усиление конструкций).
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="data.technical_condition" val="Аварийное состояние"/>
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
                <q-input outlined v-model.number="data.last_repair_year"
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
          <div class="b">
            <q-btn color="primary" label="Сохранить" type="submit"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    types: ["Отдельно стоящее", "Встроенное в многоквартирный дом", "Пристроенное к многоквартирному дому"],
    purposes: ['Корпус школы', 'Корпус д/с', 'Подразделение доп. образования', 'Овощехранилище', 'Мастерская', 'Теплица', 'Гараж', 'Иное'],
    data: {
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
      last_repair_year: null,
    },
    choose_purpose: null,
    loading: true,
  }),
  validations: {
    data: {
      street: {
        required
      },
      street_number: {
        required
      }
    }
  },
  name: 'CreateBuilding',
  methods: {
    async createBuild() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.choose_purpose !== null) {
        this.data.purpose = this.choose_purpose
      }
      let dataForm = Object.assign({}, this.data)
      dataForm['INN'] = this.$route.params['build']
      try {
        await this.$store.dispatch('createBuilding', dataForm)
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
      this.data = Object.assign({}, resp)
      Object.keys(this.data).forEach(key => (this.data[key] = null))
      this.loading = false
    } catch (e) {
      console.log(e)
    }

  }
}
</script>

<style scoped>
.select {
  margin-bottom: 1px;
}
</style>