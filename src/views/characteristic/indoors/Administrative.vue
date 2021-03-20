<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Административные кабинеты</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Общее количество</label>
            <q-input outlined :disable="disable" type="number" v-model="data.admin_room_total_count"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние административных кабинетов:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество кабинетов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.admin_room_ok_status_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество кабинетов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.admin_room_warning_status_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество кабинетов</label>
                    <q-input outlined type="number" :disable="disable"
                             v-model="data.admin_room_emergency_status_count"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div v-if="!data.admin_room_act" class="input-roof-photo" style="margin-left: 25px">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="data.admin_room_act"
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
                        @click.prevent="showDoc(data.admin_room_act)">
                  Просмотреть файл
                </button>
                <button class="btn blue"
                        @click.prevent="data.admin_room_act = null;">
                  Изменить файл
                </button>
              </div>
            </div>
          </q-card>
          <br/>
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
  name: "Administrative",
  data: () => ({
    act: null,
    disable: true,
    changedAct: false,
    data: {
      id: null,
      admin_room_ok_status_count: null,
      admin_room_total_count: null,
      admin_room_emergency_status_count: null,
      admin_room_warning_status_count: null,
      admin_room_act: null
    },
    loading: true,
  }),
  methods: {
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
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      try {
        let form_data = new FormData()
        for (let key in this.data) {
          if (key === 'admin_room_act' && typeof this.data[key] === 'string') {
            continue
          }
          (key === 'admin_room_total_count' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'admin_room_ok_status_count' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'admin_room_emergency_status_count' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'admin_room_warning_status_count' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
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

</style>