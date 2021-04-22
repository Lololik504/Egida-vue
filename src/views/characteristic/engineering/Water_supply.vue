<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong> Система водоснабжения и канализирования</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Водоснабжающая организация</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.water_supply_organization" :options="organizations"/>
            </div>
          </div>
          <div v-if="data.water_supply_organization === organizations[2]">
            <label>Введите иную водоснабжающую организацию</label>
            <q-input outlined :disable="disable" v-model="other_organization"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы водоснабжения:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_water_supply_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_water_supply_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_water_supply_system"
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
            <div v-if="!data.technical_condition_of_the_water_supply_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_water_supply_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedWaterAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedWaterAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_water_supply_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_water_supply_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_water_supply_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние системы канализирования:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_sewerage_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_sewerage_system"
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
                    <q-radio :disable="disable" v-model="data.technical_condition_of_the_sewerage_system"
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
            <div v-if="!data.technical_condition_of_the_sewerage_system_act" class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.technical_condition_of_the_sewerage_system_act"
                  outlined
                  :disable="disable"
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedSewerageAct = true"
              />
            </div>
            <div v-else style="margin-bottom: 25px">
              <label>Акт обследования технического состояния загружен</label>
              <div class="q-gutter-sm">
                <button v-if="!changedSewerageAct" class="btn blue"
                        @click.prevent="showDoc(data.technical_condition_of_the_sewerage_system_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.technical_condition_of_the_sewerage_system_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('technical_condition_of_the_sewerage_system_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <h5><strong>Документация</strong></h5>
          <div class="row">
            <div v-if="!data.water_supply_act_balance_razgranich" class="col">
              <label>Акт балансового разграничения</label>
              <q-file
                  v-model="data.water_supply_act_balance_razgranich"
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
              <label>Акт балансового разграничения загружен</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedBalanceAct" class="btn blue"
                        @click.prevent="showDoc(data.water_supply_act_balance_razgranich)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.water_supply_act_balance_razgranich = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('water_supply_act_balance_razgranich')">
                  Удалить файл
                </button>
              </div>
            </div>
            <div v-if="!data.water_supply_scheme_balance_razgranich" class="col">
              <label>Схема балансового разграничения</label>
              <q-file
                  v-model="data.water_supply_scheme_balance_razgranich"
                  :disable="disable"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
                  @input="changedBalanceScheme = true"
              />
            </div>
            <div v-else class="col">
              <label>Схема балансового разграничения загружена</label>
              <div class="q-gutter-sm column">
                <button v-if="!changedBalanceScheme" class="btn blue"
                        @click.prevent="showDoc(data.water_supply_scheme_balance_razgranich)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.water_supply_scheme_balance_razgranich = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('water_supply_scheme_balance_razgranich')">
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
  name: "Water_supply",
  data: () => ({
    organizations: ['МУП Горводоканал', 'ФГУП УЭВ', 'Иное'],
    other_organization: null,
    changedWaterAct: false,
    changedSewerageAct: false,
    changedBalanceAct: false,
    changedBalanceScheme: false,
    disable: true,
    data: {
      id: null,
      water_supply_organization: null,
      technical_condition_of_the_sewerage_system: null,
      technical_condition_of_the_sewerage_system_act: null,
      technical_condition_of_the_water_supply_system: null,
      technical_condition_of_the_water_supply_system_act: null,
      water_supply_act_balance_razgranich: null,
      water_supply_scheme_balance_razgranich: null,
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
          this.data.water_supply_organization = this.other_organization
        }
        const arrayNamesOFFiles = [
          'technical_condition_of_the_sewerage_system_act',
          'technical_condition_of_the_water_supply_system_act',
          'water_supply_act_balance_razgranich',
          'water_supply_scheme_balance_razgranich'
        ]

        let form_data = new FormData();
        for (let key in this.data) {
          if (this.data[key] === null) {
            continue
          }
          if (arrayNamesOFFiles.includes(key) && typeof this.data[key] === 'string') {
            continue
          }
          form_data.append(key, this.data[key]);
        }
        const resp = await this.$store.dispatch('sendEngineeringInfo', form_data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.other_organization = null
          this.changedWaterAct = false
          this.changedSewerageAct = false
          this.changedBalanceAct = false
          this.changedBalanceScheme = false
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