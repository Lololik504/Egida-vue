<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5>Редактирование наказа</h5>
      <form @submit.prevent="updateOrder">
        <div class="q-pa-md">
          <div class="input-field-date">
            <label>ФИО депутата</label>
            <q-input v-model="data.deputy" outlined/>
          </div>
          <div class="input-field-date">
            <label>№ наказа</label>
            <q-input v-model="data.number" outlined/>
          </div>
          <div class="input-field-date">
            <label>Округ</label>
            <q-input v-model="data.region" outlined/>
          </div>
          <div class="input-field-date">
            <label>Общая стоимость реализации наказа избирателей (тыс.руб.)</label>
            <q-input v-model.number="data.total_price" type="number" step="0.00001" outlined/>
          </div>
          <div class="input-field-date">
            <label>Местный бюджет (тыс.руб.)</label>
            <q-input v-model.number="data.local_budget" type="number" step="0.00001" outlined/>
          </div>
          <div class="input-field-date">
            <label>Областной бюджет (тыс.руб.)</label>
            <q-input v-model.number="data.regional_budget" type="number" step="0.00001" outlined/>
          </div>
          <div class="input-field-date">
            <label>Федеральный бюджет (тыс.руб.)</label>
            <q-input v-model.number="data.federal_budget" type="number" step="0.00001" outlined/>
          </div>
          <div class="select-repair">
            <label>Предмет наказа</label>
            <q-select outlined hint="Выберите предмет ремонта" v-model="itemOrder" :options="itemsRepair"
                      @input="data.appointment = null"/>
          </div>
          <div class="select-repair" v-if="itemOrder">
            <label>Назначение наказа</label>
            <q-select v-if="itemOrder === itemsRepair[0]" outlined hint="Выберите вид работ" v-model="data.appointment"
                      :options="repairConstruction"/>
            <q-select v-else-if="itemOrder === itemsRepair[1]" outlined hint="Выберите вид работ"
                      v-model="data.appointment"
                      :options="engineerConstruction"/>
            <q-select v-else-if="itemOrder === itemsRepair[2]" outlined hint="Выберите вид работ"
                      v-model="data.appointment"
                      :options="insideRooms"/>
            <q-select v-else-if="itemOrder === itemsRepair[3]" outlined hint="Выберите вид работ"
                      v-model="data.appointment"
                      :options="systemSecurity"/>
            <q-select v-else-if="itemOrder === itemsRepair[4]" outlined hint="Выберите вид работ"
                      v-model="data.appointment"
                      :options="landscaping"/>
            <q-select v-else-if="itemOrder === itemsRepair[5]" outlined hint="Выберите вид работ"
                      v-model="data.appointment"
                      :options="sportItems"/>
          </div>
          <div class="input-field-date">
            <label>Содержание наказа избирателей</label>
            <q-input v-model="data.content" outlined/>
          </div>
          <div class="input-field-date">
            <label>Мероприятия по реализации наказа избирателей </label>
            <q-input v-model="data.event" outlined/>
          </div>
          <div>
            <label>Срок исполнения наказа</label>
            <q-input outlined v-model.number="data.period_execution"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг"
                     mask="####"
                     ref="year"
                     unmasked-value
            />
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.current_year" dense left-label
                        label="Включение в приказ текущего года по ремонтным работам:"/>
          </div>
          <div class="input-field-date">
            <label>Ответственный исполнитель за выполнение мероприятий по реализации наказа избирателей</label>
            <q-input v-model="data.executor" outlined/>
          </div>
          <q-card>
            <label>Согласование наказа</label>
            <div class="q-ma-md row">
              <div class="checkbox col ">
                <q-checkbox v-model="data.agreed" dense left-label
                            label="Согласован:"/>
              </div>
              <div class="input-file col">
                <div v-if="!data.file">
                  <label>Прикрепление файла</label>
                  <q-file
                      v-model="data.file"
                      outlined
                      hint="Выберите файл с расширением pdf размером не более 3МБ"
                      max-total-size="25165824"
                      accept=".pdf"
                      @rejected="onRejected"
                  />
                </div>
                <div v-else>
                  <button class="btn waves-effect waves-light" @click.prevent="showDoc(data.file)">
                    Просмотреть файл
                  </button>
                  <button class="btn waves-effect waves-light"
                          @click.prevent="data.file = null;">
                    Изменить файл
                  </button>
                </div>
              </div>
            </div>
          </q-card>
          <br/>
          <q-card>
            <label>Отметка об исполнении</label>
            <div class="q-ma-md">
              <div class="row">
                <div class="checkbox col ">
                  <q-checkbox v-model="data.fully_executed" dense left-label
                              label="Исполнено полностью:"/>
                </div>
                <div class="checkbox col ">
                  <q-checkbox v-model="data.particially_executed" dense left-label
                              label="Исполнено частично по плану текущего года:"/>
                </div>
              </div>
              <div v-if="data.fully_executed || data.particially_executed" class="input-field-date">
                <label>Фактическая стоимость реализации наказа избирателей</label>
                <q-input v-model.number="data.actual_cost" type="number" step="0.00001" outlined/>
              </div>
            </div>
          </q-card>
          <div class="q-gutter-sm">
            <button class="btn waves-effect waves-light" type="submit">
              Изменить
            </button>
            <button class="btn waves-effect waves" @click.prevent="returnBackPage">
              Отменить
            </button>
            <button v-if="getPermission < 15" class="btn waves-effect waves" @click.prevent="removeOrder">
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
  name: "UpdateOrder",
  data: () => ({
    loading: false,
    allOrders: [{
      label: 'Реализация наказов избирателей Совета депутатов г. Новосибирска',
      value: 'sovdep'
    }, {label: 'Реализация наказов избирателей депутатов Законодательного собрания НСО', value: 'nso'}],
    itemOrder: null,
    itemsRepair: ['Строительные конструкции', 'Инженерные коммуникации', 'Внутренние помещения', 'Система безопасности', 'Благоустройство территории', 'Спортивные сооружения/теневые навесы'],
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
    order: null,
    data: {
      deputy: "",
      executed: false,
      number: "",
      region: "",
      total_price: null,
      local_budget: null,
      federal_budget: null,
      regional_budget: null,
      period_execution: "",
      content: "",
      event: "",
      executor: "",
      appointment: "",
      current_year: false,
      file: null,
      fully_executed: false,
      particially_executed: false,
      actual_cost: null,
      agreed: false,
    },
  }),
  computed: {
    getPermission: function () {
      return localStorage.getItem('permission')
    }
  },
  methods: {
    showDoc(url) {
      const link = document.createElement('a');
      link.href = server_path + url;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
    },
    async returnBackPage() {
      await this.$router.go(-1)
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    showMessage(text) {
      if (messages[text]) {
        // window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    },
    async updateOrder() {
      try {
        const arrayNamesOfNumbers = [
          'local_budget',
          'regional_budget',
          'federal_budget',
          'actual_cost'
        ]

        const token = localStorage.getItem('token')
        const inn = localStorage.getItem('currentINN')
        const url = this.$route.params['source']
        const id = this.$route.params['id']
        let file = new FormData();
        for (let key in this.data) {
          if (key === 'file' && typeof this.data[key] === 'string') {
            continue
          }
          if (arrayNamesOfNumbers.includes(key)) {
            this.data[key] = Number(this.data[key])
            console.log(this.data[key])
          }
          file.append(key, this.data[key])
        }
        await this.$store.dispatch('updateOrder', {
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
    async removeOrder() {
      try {
        const isConfirmed = confirm('Удалить данное предписание?')
        if (isConfirmed) {
          const token = localStorage.getItem('token')
          const inn = localStorage.getItem('currentINN')
          const url = this.$route.params['source']
          const id = this.$route.params['id']
          await this.$store.dispatch('deleteOrder', {
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
      console.log(inn)
      const url = this.$route.params['source']
      const id = this.$route.params['id']
      const resp = await this.$store.dispatch('fetchOrderById', {
        token,
        inn,
        url,
        id
      })
      this.data = Object.assign({}, resp['mandate'])
      // if (this.repairConstruction.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[0]
      // } else if (this.engineerConstruction.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[1]
      // } else if (this.insideRooms.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[2]
      // } else if (this.systemSecurity.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[3]
      // } else if (this.landscaping.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[4]
      // } else if (this.sportItems.includes(this.data.type_work)) {
      //   this.itemRepair = this.itemsRepair[5]
      // }
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>