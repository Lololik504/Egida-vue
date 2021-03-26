<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5>Добавить наказ</h5>
      <form @submit.prevent="createOrder">
        <div class="q-pa-md">
          <div class="select-district q-gutter-md">
            <label>Реализация наказов</label>
            <q-select outlined hint="Выберите реализацию наказов" v-model="$v.order.$model"
                      :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
                      :options="allOrders"
                      :class="{invalid: (!$v.order.required && $v.order.$dirty)}"
                      :error-message="!$v.order.required && $v.order.$dirty ? 'Поле не должно быть пустым': ''"
                      :error="(!$v.order.required && $v.order.$dirty)"
            />
          </div>
          <div class="input-field-date">
            <label>ФИО депутата</label>
            <q-input v-model="data.FIO" outlined/>
          </div>
          <div class="input-field-date">
            <label>№ наказа</label>
            <q-input v-model="data.number_order" outlined/>
          </div>
          <div class="input-field-date">
            <label>Округ</label>
            <q-input v-model="data.okrug" outlined/>
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
            <q-input v-model.number="data.region_budget" type="number" step="0.00001" outlined/>
          </div>
          <div class="input-field-date">
            <label>Федеральный бюджет (тыс.руб.)</label>
            <q-input v-model.number="data.federal_budget" type="number" step="0.00001" outlined/>
          </div>
          <div class="select-repair">
            <label>Предмет наказа</label>
            <q-select outlined hint="Выберите предмет ремонта" v-model="itemOrder" :options="itemsRepair"
                      @input="data.type_order = null"/>
          </div>
          <div class="select-repair" v-if="itemOrder">
            <label>Назначение наказа</label>
            <q-select v-if="itemOrder === itemsRepair[0]" outlined hint="Выберите вид работ" v-model="data.type_order"
                      :options="repairConstruction"/>
            <q-select v-else-if="itemOrder === itemsRepair[1]" outlined hint="Выберите вид работ"
                      v-model="data.type_order"
                      :options="engineerConstruction"/>
            <q-select v-else-if="itemOrder === itemsRepair[2]" outlined hint="Выберите вид работ"
                      v-model="data.type_order"
                      :options="insideRooms"/>
            <q-select v-else-if="itemOrder === itemsRepair[3]" outlined hint="Выберите вид работ"
                      v-model="data.type_order"
                      :options="systemSecurity"/>
            <q-select v-else-if="itemOrder === itemsRepair[4]" outlined hint="Выберите вид работ"
                      v-model="data.type_order"
                      :options="landscaping"/>
            <q-select v-else-if="itemOrder === itemsRepair[5]" outlined hint="Выберите вид работ"
                      v-model="data.type_order"
                      :options="sportItems"/>
          </div>
          <div class="input-field-date">
            <label>Содержание наказа избирателей</label>
            <q-input v-model="data.order_idea" outlined/>
          </div>
          <div class="input-field-date">
            <label>Мероприятия по реализации наказа избирателей </label>
            <q-input v-model="data.order_activity" outlined/>
          </div>
          <div>
            <label>Срок исполнения наказа</label>
            <q-input outlined v-model.number="data.order_execution"
                     placeholder="гггг"
                     type="tel"
                     hint="в формате гггг"
                     mask="####"
                     ref="year"
                     unmasked-value
            />
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.vkluchenie" dense left-label
                        label="Включение в приказ текущего года по ремонтным работам:"/>
          </div>
          <div class="input-field-date">
            <label>Ответственный исполнитель за выполнение мероприятий по реализации наказа избирателей</label>
            <q-input v-model="data.order_executor" outlined/>
          </div>
          <q-card>
            <label>Согласование наказа</label>
            <div class="q-ma-md row">
              <div class="checkbox col ">
                <q-checkbox v-model="data.agreement" dense left-label
                            label="Согласован:"/>
              </div>
              <div class="input-file col">
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
            </div>
          </q-card>
          <br/>
          <q-card>
            <label>Отметка об исполнении</label>
            <div class="q-ma-md">
              <div class="row">
                <div class="checkbox col ">
                  <q-checkbox v-model="data.full_complete" dense left-label
                              label="Исполнено полностью:"/>
                </div>
                <div class="checkbox col ">
                  <q-checkbox v-model="data.part_complete" dense left-label
                              label="Исполнено частично по плану текущего года:"/>
                </div>
              </div>
              <div v-if="data.full_complete || data.part_complete" class="input-field-date">
                <label>Фактическая стоимость реализации наказа избирателей</label>
                <q-input v-model.number="data.fact_price" type="number" step="0.00001" outlined/>
              </div>
            </div>
          </q-card>
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
import messages from "@/utils/messages";

export default {
  name: "CreateOrder",
  data: () => ({
    loading: false,
    allOrders: [{label: 'Реализация наказов избирателей Совета депутатов г. Новосибирска', value: 'sovdep'}, {label: 'Реализация наказов избирателей депутатов Законодательного собрания НСО', value: 'nso'}],
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
      FIO: null,
      executed: false,
      number_order: null,
      okrug: null,
      total_price: null,
      local_budget: null,
      federal_budget: null,
      region_budget: null,
      period_execution: null,
      order_idea: null,
      order_activity: null,
      order_execution: null,
      order_executor: null,
      type_order: null,
      vkluchenie: false,
      file: null,
      full_complete: false,
      part_complete: false,
      fact_price: null,
      agreement: false,
    },
  }),
  validations: {
      order: {
        required
      }
  },
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
    showMessage(text) {
      if (messages[text]) {
        // window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    },
    async createOrder() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          this.showMessage('fillFields')
          return
        }

        const token = localStorage.getItem('token')
        const inn = this.$route.params['id']
        let form_data = new FormData();
        for (let key in this.data) {
          if (key === 'file' && typeof this.data[key] === 'string') {
            continue
          }
          (key === 'total_price' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'local_budget' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'region_budget' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'federal_budget' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'order_execution' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          (key === 'fact_price' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null;
          form_data.append(key, this.data[key]);
        }
        await this.$store.dispatch('createPrescription', {
          form_data,
          url: this.order,
          token,
          inn
        })
        this.showMessage('saveSuccess')
        await this.returnBackPage()
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
    }
  }
}
</script>

<style scoped>

</style>