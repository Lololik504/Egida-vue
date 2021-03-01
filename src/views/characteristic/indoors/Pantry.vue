<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Буфетная</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Общее количество буфетных</label>
            <q-input outlined type="number" :disable="disable" v-model="data.pantry_total_count"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние буфетных:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество буфетных</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.pantry_ok_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество буфетных</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.pantry_warning_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество буфетных</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.pantry_emergency_count"/>
                  </div>
                </q-item>
              </q-list>
            </div>
<!--            <div class="input-roof-photo">-->
<!--              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>-->
<!--              <q-file-->
<!--                  v-model="act"-->
<!--                  outlined-->
<!--                  :disable="disable"-->
<!--                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                  multiple-->
<!--                  max-total-size="25165824"-->
<!--                  accept=".jpg, image/jpeg, .pdf"-->
<!--                  @rejected="onRejected"-->
<!--              />-->
<!--            </div>-->
          </q-card>
          <br/>
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

export default {
  name: "Pantry",
  data: () => ({
    act: null,
    disable: true,
    data: {
      id:null,
      pantry_total_count: null,
      pantry_emergency_count: null,
      pantry_warning_count: null,
      pantry_ok_count: null,
    },
    loading: true,
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
        const resp = await this.$store.dispatch('sendIndoorInfo', this.data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
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
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchIndoors', {token, id})
      Object.assign(this.data, info)
      this.data['id'] = id
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>