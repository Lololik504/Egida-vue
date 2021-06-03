<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Актовый зал</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <q-card flat bordered class="my-card">
            <label>Техническое состояние актовых залов:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" step="0.001" :disable="disable"
                             v-model="data.auditorium_ok_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" step="0.001" :disable="disable"
                             v-model="data.auditorium_warning_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Процент актовых залов</label>
                    <q-input outlined type="number" step="0.001" :disable="disable"
                             v-model="data.auditorium_emergency_percent"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div v-if="!data.auditorium_act" class="input-roof-photo" style="margin-left: 25px">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.auditorium_act"
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
                        @click.prevent="showDoc(data.auditorium_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.auditorium_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('auditorium_act')">
                  Удалить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
          <div class="select-type-field">
            <label>Наличие вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_exhaust_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.auditorium_exhaust_ventilation">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_exhaust_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.auditorium_ventilation_type"
                        :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_supply_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.auditorium_supply_ventilation">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.auditorium_supply_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.auditorium_air_heater_type"
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
  name: "Auditorium",
  data: () => ({
    act: null,
    disable: true,
    changedAct: false,
    data: {
      id: null,
      auditorium_technical_condition: null,
      auditorium_ok_percent: null,
      auditorium_warning_percent: null,
      auditorium_emergency_percent: null,
      auditorium_exhaust_ventilation: null,
      auditorium_supply_ventilation: null,
      auditorium_exhaust_ventilation_is_workable: null,
      auditorium_supply_ventilation_is_workable: null,
      auditorium_ventilation_type: null,
      auditorium_air_heater_type: null,
      auditorium_act: null
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
          if (key === 'auditorium_act' && typeof this.data[key] === 'string') {
            continue
          }
          (key === 'auditorium_ok_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'auditorium_warning_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'auditorium_emergency_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
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