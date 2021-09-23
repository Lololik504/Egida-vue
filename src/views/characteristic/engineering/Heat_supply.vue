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
              <q-select outlined :disable="disable" v-model="data.heat_power_supply_organization"
                        :options="organizations"/>
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
            <q-tooltip anchor="bottom middle" self="bottom middle">Взять из акта балансового разграничения</q-tooltip>
          </div>
          <div class="input-field-roof-square">
            <label>Питание от магистрали №</label>
            <q-input outlined :disable="disable" v-model="data.heat_power_supply_from_line"/>
            <q-tooltip anchor="bottom middle" self="bottom middle">Взять из акта балансового разграничения</q-tooltip>
          </div>
          <div class="select-type-field">
            <label>Граница эксплуатационной ответственности</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.operational_responsibility_boundary"
                        :options="borders"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Схема подключение горячего водоснабжения</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.hot_water_connection_diagram" :options="schemas"/>
              <q-tooltip anchor="bottom middle" self="bottom middle"
                         v-if="data.hot_water_connection_diagram === schemas[2]">Электрический водонагреватель не
                относится к ВПУ!
              </q-tooltip>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип присоединения системы отопления</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.heating_system_connection_type"
                        :options="schema_types"/>
            </div>
          </div>
          <div class="input-field-mask">
            <label>Температурный график</label>
            <q-input outlined
                     :disable="disable"
                     v-model="data.Temperature_graph"
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
              <q-input outlined :disable="disable" step="0.00001" type="number"
                       v-model.number="data.thermal_loads_heating"/>
            </div>
            <div class="col">
              <label>Горячее водоснабжение</label>
              <q-input outlined :disable="disable" step="0.00001" type="number"
                       v-model.number="data.thermal_loads_hot_water_supply"/>
            </div>
            <div class="col">
              <label>Вентиляция</label>
              <q-input outlined :disable="disable" step="0.00001" type="number"
                       v-model.number="data.thermal_loads_ventilation"/>
            </div>
            <div class="col">
              <label>Суммарная</label>
              <q-input outlined :disable="disable" step="0.00001" type="number"
                       v-model.number="data.thermal_loads_total"/>
            </div>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования тепла</label>
            <q-input outlined :disable="disable" type="number" v-model="data.number_of_automatic_heat_control_systems"/>
          </div>
          <div class="input-field-roof-square">
            <label>Количество систем автоматического регулирования приточной установки</label>
            <q-input outlined :disable="disable" type="number"
                     v-model="data.number_of_automatic_control_systems_for_the_air_handling_unit"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы отопления:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_heating_system"
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
            <div v-if="!data.technical_condition_of_the_heating_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_heating_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedHeatAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedHeatAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_heating_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_heating_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_heating_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы вентиляции:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_ventilation_system"
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
            <div v-if="!data.technical_condition_of_the_ventilation_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_ventilation_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedVentAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedVentAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_ventilation_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_ventilation_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_ventilation_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы горячего водоснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_hot_water_supply_system"
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
            <div v-if="!data.technical_condition_of_the_hot_water_supply_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_hot_water_supply_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedHotAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedHotAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_hot_water_supply_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_hot_water_supply_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_hot_water_supply_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <div class="input-field-roof-square">
            <label>Организация, обслуживающая приборы учеты тепловой энергии</label>
            <q-input outlined :disable="disable" v-model="data.obsluzh_organization"/>
          </div>
          <div class="documents">
            <h5><strong>Документация</strong></h5>
            <div class="row">
              <div v-if="!data.passport_vvoda" class="col">
                <label>Паспорт ввода</label>
                <q-file
                    v-model="data.passport_vvoda"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedPassVvoda = true"
                />
              </div>
              <div v-else class="col">
                <label>Паспорт ввода загружен</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedPassVvoda" class="btn blue"
                          @click.prevent="showDoc(data.passport_vvoda)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.passport_vvoda = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('passport_vvoda')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.schema_vvoda" class="col">
                <label>Схема ввода</label>
                <q-file
                    v-model="data.schema_vvoda"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedSchemaVvoda = true"
                />
              </div>
              <div v-else class="col">
                <label>Схема ввода загружена</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedSchemaVvoda" class="btn blue"
                          @click.prevent="showDoc(data.schema_vvoda)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.schema_vvoda = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('schema_vvoda')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.passport_itp" class="col">
                <label>Паспорт ИТП</label>
                <q-file
                    v-model="data.passport_itp"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedPassITP = true"
                />
              </div>
              <div v-else class="col">
                <label>Паспорт ИТП загружен</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedPassITP" class="btn blue"
                          @click.prevent="showDoc(data.passport_itp)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.passport_itp = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('passport_itp')">
                    Удалить файл
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div v-if="!data.schema_itp" class="col">
                <label>Схема ИТП</label>
                <q-file
                    v-model="data.schema_itp"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedSchemaITP = true"
                />
              </div>
              <div v-else class="col">
                <label>Схема ИТП загружена</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedSchemaITP" class="btn blue"
                          @click.prevent="showDoc(data.schema_itp)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.schema_itp = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('schema_itp')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.act_balance_razgranich" class="col">
                <label>Акт балансового разграничения</label>
                <q-file
                    :disable="disable"
                    v-model="data.act_balance_razgranich"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedBalanceAct = true"
                />
              </div>
              <div v-else class="col">
                <label>Акт балансового разграничения загружен</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedBalanceAct" class="btn blue"
                          @click.prevent="showDoc(data.act_balance_razgranich)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.act_balance_razgranich = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('act_balance_razgranich')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.schema_balance_razgranich" class="col">
                <label>Схема балансового разграничения</label>
                <q-file
                    v-model="data.schema_balance_razgranich"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedBalanceSchema = true"
                />
              </div>
              <div v-else class="col">
                <label>Схема разграничения загружена</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedBalanceSchema" class="btn blue"
                          @click.prevent="showDoc(data.schema_balance_razgranich)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.schema_balance_razgranich = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('schema_balance_razgranich')">
                    Удалить файл
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div v-if="!data.spravka_teplov_nagruz" class="col">
                <label>Справка о тепловых нагрузках</label>
                <q-file
                    v-model="data.spravka_teplov_nagruz"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedSpravka = true"
                />
              </div>
              <div v-else class="col">
                <label>Справка о тепловых нагрузках загружена</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedSpravka" class="btn blue"
                          @click.prevent="showDoc(data.spravka_teplov_nagruz)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.spravka_teplov_nagruz = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('spravka_teplov_nagruz')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.raschet_teplov_poter" class="col">
                <label>Расчет тепловых потерь</label>
                <q-file
                    v-model="data.raschet_teplov_poter"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedRaschet = true"
                />
              </div>
              <div v-else class="col">
                <label>Расчет тепловых потерь загружен</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedRaschet" class="btn blue"
                          @click.prevent="showDoc(data.raschet_teplov_poter)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.raschet_teplov_poter = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('raschet_teplov_poter')">
                    Удалить файл
                  </button>
                </div>
              </div>
              <div v-if="!data.toposnova" class="col">
                <label>Топоснова</label>
                <q-file
                    v-model="data.toposnova"
                    :disable="disable"
                    outlined
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedToposnova = true"
                />
              </div>
              <div v-else class="col">
                <label>Топоснова загружена</label>
                <div class="q-gutter-sm column">
                  <button v-if="!changedToposnova" class="btn blue"
                          @click.prevent="showDoc(data.toposnova)">
                    Просмотреть файл
                  </button>
                  <button class="btn blue"
                          @click.prevent="data.toposnova = null;">
                    Изменить файл
                  </button>
                  <button v-if="getPermission" class="btn blue"
                          @click.prevent="deleteDoc('toposnova')">
                    Удалить файл
                  </button>
                </div>
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
    changedHeatAct: false,
    changedHotAct: false,
    changedVentAct: false,
    changedPassVvoda: false,
    changedSchemaVvoda: false,
    changedPassITP: false,
    changedSchemaITP: false,
    changedBalanceAct: false,
    changedBalanceSchema: false,
    changedSpravka: false,
    changedRaschet: false,
    changedToposnova: false,
    data: {
      id: null,
      heating_system_connection_type: null,
      obsluzh_organization: null,
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
      technical_condition_of_the_heating_system_act: null,
      technical_condition_of_the_ventilation_system: null,
      technical_condition_of_the_ventilation_system_act: null,
      technical_condition_of_the_hot_water_supply_system: null,
      technical_condition_of_the_hot_water_supply_system_act: null,
      passport_vvoda: null,
      schema_vvoda: null,
      passport_itp: null,
      schema_itp: null,
      act_balance_razgranich: null,
      schema_balance_razgranich: null,
      spravka_teplov_nagruz: null,
      raschet_teplov_poter: null,
      toposnova: null,
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
        if (this.data[filename]) {
          await this.$store.dispatch('deleteEngineeringDoc', {id: this.data.id, docId: filename})
          this.data[filename] = null
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
          this.data.heat_power_supply_organization = this.other_organization
        }
        if (this.other_warm_source) {
          this.data.heat_supply_source = this.other_warm_source
        }

        const arrayNamesOFFiles = [
          'technical_condition_of_the_hot_water_supply_system_act',
          'technical_condition_of_the_ventilation_system_act',
          'technical_condition_of_the_heating_system_act',
          'passport_vvoda',
          'schema_vvoda',
          'passport_itp',
          'schema_itp',
          'act_balance_razgranich',
          'schema_balance_razgranich',
          'spravka_teplov_nagruz',
          'raschet_teplov_poter',
          'toposnova'
        ]
        const arrayNamesOfNumbers = [
          'thermal_loads_heating',
          'thermal_loads_hot_water_supply',
          'thermal_loads_ventilation',
          'thermal_loads_total',
          'number_of_automatic_heat_control_systems',
          'number_of_automatic_control_systems_for_the_air_handling_unit',
          'ITP_commissioning_year',
          'year_of_acceptance_on_maintenance'
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
          form_data.append(key, this.data[key])
        }

        const resp = await this.$store.dispatch('sendEngineeringInfo', form_data)

        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.changedHeatAct = false
          this.changedHotAct = false
          this.changedVentAct = false
          this.other_organization = null
          this.other_warm_source = null
          this.changedPassVvoda = false
          this.changedSchemaVvoda = false
          this.changedPassITP = false
          this.changedSchemaITP = false
          this.changedBalanceAct = false
          this.changedBalanceSchema = false
          this.changedSpravka = false
          this.changedRaschet = false
          this.changedToposnova = false
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
.my-card {
  border-width: 2px;
  border-color: #999999;
  padding-left: 10px;
}
</style>