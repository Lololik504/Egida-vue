<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5>Добавить предписание</h5>
      <form @submit.prevent="createPrescript">
        <div class="q-pa-md">
          <div class="select-district">
            <label>Надзорные органы / судебные решения</label>
            <q-select outlined hint="Выберите надзорный орган / судебное решение" v-model="$v.prescription.$model"
                      :options="allPrescriptions"
                      :class="{invalid: (!$v.prescription.required && $v.prescription.$dirty)}"
                      :error-message="!$v.prescription.required && $v.prescription.$dirty ? 'Поле не должно быть пустым': ''"
                      :error="(!$v.prescription.required && $v.prescription.$dirty)"
            />
          </div>
          <div class="input-field-date">
            <label>Дата вынесения предписания</label>
            <q-input v-model="date_order" outlined type="date"/>
          </div>
          <div class="select-repair">
            <label>Предмет ремонта</label>
            <q-select outlined hint="Выберите предмет ремонта" v-model="itemRepair" :options="itemsRepair"
                      @input="type_work = null"/>
          </div>
          <div class="select-repair" v-if="itemRepair">
            <label>Вид работ </label>
            <q-select v-if="itemRepair === itemsRepair[0]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="repairConstruction"/>
            <q-select v-else-if="itemRepair === itemsRepair[1]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="engineerConstruction"/>
            <q-select v-else-if="itemRepair === itemsRepair[2]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="insideRooms"/>
            <q-select v-else-if="itemRepair === itemsRepair[3]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="systemSecurity"/>
            <q-select v-else-if="itemRepair === itemsRepair[4]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="landscaping"/>
            <q-select v-else-if="itemRepair === itemsRepair[5]" outlined hint="Выберите вид работ" v-model="type_work"
                      :options="sportItems"/>
          </div>
          <div class="input-price">
            <label>Сумма</label>
            <q-input outlined
                     placeholder="Введите сумму (тыс.руб.)"
                     v-model.number="summa"
                     type="number"
                     step="0.00001"
            />
          </div>
          <div class="input-field-date">
            <label>Срок исполнения</label>
            <q-input v-model="period_execution" outlined type="date"/>
          </div>
          <div class="input-file">
            <label>Скан предписания</label>
            <q-file
                v-model="order"
                outlined
                hint="Выберите файл с расширением pdf размером не более 3МБ"
                max-total-size="25165824"
                accept=".pdf"
                @rejected="onRejected"
            />
          </div>
          <div v-if="getPermission" class="checkbox col">
            <q-checkbox v-model="vkluchenie" dense left-label
                        label="Включение в приказ текущего года по ремонтным работам:"/>
          </div>
          <div v-if="getPermission" class="checkbox col">
            <q-checkbox v-model="executed" dense left-label
                        label="Исполнено:"/>
          </div>
          <div class="q-gutter-sm">
            <button class="btn waves-effect waves-light" type="submit">
              Сохранить
            </button>
            <button class="btn waves-effect waves" @click.prevent="returnBackPage">
              Отменить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "CreatePrescription",
  data: () => ({
    loading: false,
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
    date_order: null,
    executed: false,
    summa: null,
    order: null,
    period_execution: null,
    type_work: null,
    vkluchenie: false,
  }),
  validations: {
    prescription: {
      required
    }
  },
  computed: {
    getPermission: function () {
      return localStorage.getItem('permission')
    }
  },
  methods: {
    onRejected() {
      this.$error('Файл слишком велик!')
    },
    async returnBackPage() {
      await this.$router.go(-1)
    },
    async createPrescript() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          this.$showMessage('fillFields')
          return
        }

        const token = localStorage.getItem('token')
        const inn = this.$route.params['id']
        if (this.summa === '') {
          this.summa = null
        }
        let file = new FormData();
        file.append('file', this.order)
        file.append('date_order', this.date_order)
        file.append('executed', this.executed)
        file.append('vkluchenie', this.vkluchenie)
        file.append('period_execution', this.period_execution)
        file.append('type_work', this.type_work)
        file.append('summa', this.summa)
        await this.$store.dispatch('createPrescription', {
          file,
          url: this.allPrescriptionsURL[this.allPrescriptions.findIndex(value => this.prescription === value)],
          token,
          inn
        })
        this.$showMessage('saveSuccess')
        await this.returnBackPage()
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    }
  }
}
</script>

<style scoped>

</style>