<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5>Редактирование предписания</h5>
      <form @submit.prevent="updatePrescript">
        <div class="q-pa-md">
          <div class="input-field-date">
            <label>Дата вынесения предписания</label>
            <q-input v-model="data.date_order" outlined type="date"/>
          </div>
          <div class="select-repair">
            <label>Предмет ремонта</label>
            <q-select outlined hint="Выберите предмет ремонта" v-model="itemRepair" :options="itemsRepair"
                      @input="type_work = null"/>
          </div>
          <div class="select-repair" v-if="itemRepair">
            <label>Вид работ </label>
            <q-select v-if="itemRepair === itemsRepair[0]" outlined hint="Выберите вид работ" v-model="data.type_work"
                      :options="repairConstruction"/>
            <q-select v-else-if="itemRepair === itemsRepair[1]" outlined hint="Выберите вид работ"
                      v-model="data.type_work"
                      :options="engineerConstruction"/>
            <q-select v-else-if="itemRepair === itemsRepair[2]" outlined hint="Выберите вид работ"
                      v-model="data.type_work"
                      :options="insideRooms"/>
            <q-select v-else-if="itemRepair === itemsRepair[3]" outlined hint="Выберите вид работ"
                      v-model="data.type_work"
                      :options="systemSecurity"/>
            <q-select v-else-if="itemRepair === itemsRepair[4]" outlined hint="Выберите вид работ"
                      v-model="data.type_work"
                      :options="landscaping"/>
            <q-select v-else-if="itemRepair === itemsRepair[5]" outlined hint="Выберите вид работ"
                      v-model="data.type_work"
                      :options="sportItems"/>
          </div>
          <div class="input-price">
            <label>Сумма</label>
            <q-input outlined
                     placeholder="Введите сумму (тыс.руб.)"
                     v-model.number="data.summa"
                     type="number"
                     step="0.00001"
            />
          </div>
          <div class="input-field-date">
            <label>Срок исполнения</label>
            <q-input v-model="data.period_execution" outlined type="date"/>
          </div>
          <div v-if="!data.order" class="input-file">
            <label>Скан предписания</label>
            <q-file
                v-model="data.order"
                outlined
                hint="Выберите файл с расширением pdf размером не более 3МБ"
                max-total-size="25165824"
                accept=".pdf"
                @rejected="onRejected"
            />
          </div>
          <div v-else style="margin-bottom: 25px">
            <label>Скан предписания загружен</label>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(data.order)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="data.order = null;">
                Изменить файл
              </button>
            </div>
          </div>
          <div v-if="getPermission" class="checkbox col">
            <q-checkbox v-model="data.vkluchenie" dense left-label
                        label="Включение в приказ текущего года по ремонтным работам:"/>
          </div>
          <div v-if="getPermission" class="checkbox col">
            <q-checkbox v-model="data.executed" dense left-label
                        label="Исполнено:"/>
          </div>
          <div class="q-gutter-sm">
            <button class="btn waves-effect waves-light" type="submit">
              Изменить
            </button>
            <button class="btn waves-effect waves" @click.prevent="returnBackPage">
              Отменить
            </button>
            <button v-if="getPermission < 15" class="btn waves-effect waves" @click.prevent="removePrescription">
              Удалить
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
  name: "CreatePrescription",
  data: () => ({
    loading: true,
    allPrescriptions: ['Роспотребнадзор', 'Госпожнадзор', 'Ростехнадзор', 'Судебные решения', 'Прочие надзорные органы'],
    allPrescriptionsURL: ['rospotreb', 'gospozh', 'rostech', 'sudeb', 'otherorders'],
    itemsRepair: ['Строительные конструкции', 'Инженерные коммуникации', 'Внутренние помещения', 'Система безопасности', 'Благоустройство территории', 'Спортивные сооружения/теневые навесы'],
    itemRepair: null,
    repairConstruction: [
      'Кровля',
      'Фасад',
      'Фундамент',
      'Межэтажные перекрытия',
      'Чердачные перекрытия',
      'Подвальные перекрытия',
      'Отмостка',
      'Окна'
    ],
    engineerConstruction: [
      'Система отопления',
      'Система горячего водоснабжения',
      'Система вентиляции',
      'Система холодного водоснабжения',
      'Система канализирования',
      'Систем электроснабжения'
    ],
    insideRooms: [
      'Учебные/игровые помещения (классы/игровые/спальни)',
      'Коридоры',
      'Административные кабинеты',
      'Пищеблок',
      'Спортзал',
      'Актовый зал',
      'Санузел',
      'Прачечная',
      'Буфетная',
      'Эвакуационные выходы'
    ],
    systemSecurity: [
      'Автоматическая пожарная сигнализация',
      'Видеонаблюдения'
    ],
    landscaping: [
      'Озеленение',
      'Асфальтовое покрытие',
      'Ограждение',
      'Контейнерная площадка для сбора ТКО'
    ],
    sportItems: [
      'Спортивная площадка',
      'Хоккейная коробка',
      'Теневые навесы'
    ],
    prescription: null,
    data: {
      date_order: null,
      executed: false,
      summa: null,
      order: null,
      period_execution: null,
      type_work: null,
      vkluchenie: false
    }
  }),
  computed: {
    getPermission: function () {
      return localStorage.getItem('permission')
    }
  },
  methods: {
    async returnBackPage() {
      await this.$router.go(-1)
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
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
        // window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    },
    async updatePrescript() {
      try {
        const token = localStorage.getItem('token')
        const inn = localStorage.getItem('currentINN')
        const url = this.$route.params['source']
        const id = this.$route.params['id']
        let file = new FormData();
        for (let key in this.data) {
          if (key === 'order') {
            file.append('file', this.data[key])
          } else {
            (key === 'summa' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
            file.append(key, this.data[key])
          }
        }
        await this.$store.dispatch('updatePrescription', {
          file,
          url,
          token,
          inn,
          id
        })
        this.showMessage('saveSuccess')
        await this.returnBackPage()
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    },
    async removePrescription() {
      try {
        const isConfirmed = confirm('Удалить данное предписание?')
        if (isConfirmed) {
          const token = localStorage.getItem('token')
          const inn = localStorage.getItem('currentINN')
          const url = this.$route.params['source']
          const id = this.$route.params['id']
          await this.$store.dispatch('deletePrescription', {
            url,
            token,
            inn,
            id
          })
          this.showMessage('deleteSuccess')
          await this.returnBackPage()
        }
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const inn = localStorage.getItem('currentINN')
      const url = this.$route.params['source']
      const id = this.$route.params['id']
      const resp = await this.$store.dispatch('fetchPrescriptionById', {
        token,
        inn,
        url,
        id
      })
      this.data = resp[url]
      if (this.repairConstruction.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[0]
      } else if (this.engineerConstruction.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[1]
      } else if (this.insideRooms.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[2]
      } else if (this.systemSecurity.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[3]
      } else if (this.landscaping.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[4]
      } else if (this.sportItems.includes(this.data.type_work)) {
        this.itemRepair = this.itemsRepair[5]
      }
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>