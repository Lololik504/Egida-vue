<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Спортзал</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Количество спортзалов</label>
            <q-input outlined :disable="disable" type="number" v-model="data.gym_room_total_count"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние спортзалов:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортзалов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.gym_ok_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортзалов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.gym_warning_percent"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортзалов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.gym_emergency_percent"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div v-if="!data.gym_act" class="input-roof-photo" style="margin-left: 25px">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.gym_act"
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
                        @click.prevent="showDoc(data.gym_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.gym_act = null;">
                  Изменить файл
                </button>
                <button v-if="getPermission" class="btn blue"
                        @click.prevent="deleteDoc('gym_act')">
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
                        v-model="data.gym_exhaust_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.gym_exhaust_ventilation">
            <label>Техническое состояние вытяжной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.gym_exhaust_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип вентиляции</label>
            <div class="select">
              <q-select outlined
                        :disable="disable"
                        v-model="data.gym_ventilation_type" :options="['Естественная', 'С механическим побуждением']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.gym_supply_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field" v-if="data.gym_supply_ventilation">
            <label>Техническое состояние приточной вентиляции</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.gym_supply_ventilation_is_workable"
                        :options="[{label: 'Работоспособное', value: true}, {label: 'Неисправное', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип воздухонагревателя</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.gym_air_heater_type"
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
  name: "Gym",
  data: () => ({
    act: null,
    disable: true,
    changedAct: false,
    data: {
      id: null,
      gym_technical_condition: null,
      gym_room_total_count: null,
      gym_ok_percent: null,
      gym_warning_percent: null,
      gym_emergency_percent: null,
      gym_exhaust_ventilation: null,
      gym_supply_ventilation: null,
      gym_exhaust_ventilation_is_workable: null,
      gym_supply_ventilation_is_workable: null,
      gym_ventilation_type: null,
      gym_air_heater_type: null,
      gym_act: null
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
          if (key === 'gym_act' && typeof this.data[key] === 'string') {
            continue
          }
          (key === 'gym_room_total_count' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'gym_ok_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'gym_warning_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'gym_emergency_percent' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
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