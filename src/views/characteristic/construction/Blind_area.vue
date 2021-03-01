<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Отмостка</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-area-square">
            <label>Площадь отмостки, кв. м.</label>
            <q-input outlined :disable="disable" type="number" step="0.001" v-model.number="data.blind_area_square"/>
          </div>
          <div class="input-field-area-length">
            <label>Длина отмостки, м.</label>
            <q-input outlined :disable="disable" type="number" step="0.001" v-model.number="data.blind_area_length"/>
          </div>
<!--          <div class="input-roof-photo">-->
<!--            <label>Фото отмостки</label>-->
<!--            <q-file-->
<!--                v-model="data.photo"-->
<!--                outlined-->
<!--                :disable="disable"-->
<!--                hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                multiple-->
<!--                max-total-size="25165824"-->
<!--                accept=".jpg, image/jpeg, .pdf"-->
<!--                @rejected="onRejected"-->
<!--            />-->
<!--          </div>-->
          <div class="select-type-field">
            <label>Тип отмостки</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.blind_area_type" :options="area_types"/>
            </div>
          </div>
          <div v-if="data.blind_area_type === area_types[2]">
            <label>Введите тип отмостки</label>
            <q-input outlined :disable="disable" v-model="other_type"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние отмостки:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.blind_area_status" val="Исправное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Исправное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся отсутствием дефектов и повреждений, влияющих на снижение
                      несущей способности и эксплуатационной пригодности.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.blind_area_status" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.blind_area_status" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.blind_area_status" val="Недопустимое состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Недопустимое состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся снижением несущей способности и эксплуатационных
                      характеристик, при котором существует опасность для пребывания людей и сохранности
                      оборудования
                      (необходимо проведение страховочных мероприятий и усиление конструкций).
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.blind_area_status" val="Аварийное состояние"/>
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
          </q-card>
          <br/>
<!--          <div class="input-roof-photo">-->
<!--            <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>-->
<!--            <q-file-->
<!--                v-model="data.act"-->
<!--                outlined-->
<!--                :disable="disable"-->
<!--                hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"-->
<!--                multiple-->
<!--                max-total-size="25165824"-->
<!--                accept=".jpg, image/jpeg, .pdf"-->
<!--                @rejected="onRejected"-->
<!--            />-->
<!--          </div>-->
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
  name: "Blind_area",
  data: () => ({
    loading: true,
    area_types: ['Бетонная', 'Асфальтовая', 'Прочее'],
    other_type: null,
    disable: true,
    data: {
      id: null,
      blind_area_type: null,
      blind_area_status: null,
      act: null,
      blind_area_square: null,
      blind_area_length: null,
      photo: null
    }
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
        if (this.other_type) {
          this.data.blind_area_type = this.other_type
        }
        const resp = await this.$store.dispatch('sendConstructionInfo', this.data)
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
        window.scrollTo(0,0)
        this.$message(messages[text])
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchConstruction', {token, id})
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
.select {
  margin-bottom: 1px;
}
</style>