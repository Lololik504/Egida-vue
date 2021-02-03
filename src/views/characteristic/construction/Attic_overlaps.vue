<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Чердачные перекрытия</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-material-field">
            <label>Материал чердачных перекрытий</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.attic_overlapping_material" :options="overlap_materials"/>
            </div>
          </div>
          <div v-if="data.attic_overlapping_material === overlap_materials[2]">
            <label>Введите материал чердачных перекрытий</label>
            <q-input outlined :disable="disable" v-model="other_material"/>
          </div>
          <div class="select-warming-field">
            <label>Утепление чердачного перекрытияй</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.attic_overlapping_warming" :options="overlap_warmings"/>
            </div>
          </div>
          <div v-if="data.attic_overlapping_warming === overlap_warmings[5]">
            <label>Введите материал чердачных перекрытий</label>
            <q-input outlined :disable="disable" v-model="other_warming"/>
          </div>
          <div class="input-field-warming">
            <label>Толщина утепления чердачных перекрытый, мм.</label>
            <q-input outlined :disable="disable" type="number" v-model.number="data.attic_overlapping_thickness"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние чердачных перекрытий:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.attic_overlapping_status" val="Исправное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.attic_overlapping_status" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.attic_overlapping_status" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.attic_overlapping_status" val="Недопустимое состояние"/>
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
                    <q-radio :disable="disable" v-model="data.attic_overlapping_status" val="Аварийное состояние"/>
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
          <div class="input-roof-photo">
            <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
            <q-file
                v-model="data.act"
                outlined
                :disable="disable"
                hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                multiple
                max-total-size="25165824"
                accept=".jpg, image/jpeg, .pdf"
                @rejected="onRejected"
            />
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

export default {
  name: "Attic_overlaps",
  data: () => ({
    overlap_materials: [
      'Железобетонные',
      'Деревянные',
      'Прочее'
    ],
    overlap_warmings: [
      'Шлак',
      'Керамзит',
      'Минеральная вата',
      'Пенополистирол (экструдированный или неэкструдированный)',
      'Газобетон',
      'Прочее'
    ],
    other_material: null,
    other_warming: null,
    loading: true,
    disable: true,
    data: {
      id: null,
      attic_overlapping_status: null,
      attic_overlapping_material: null,
      attic_overlapping_thickness: null,
      attic_overlapping_warming: null,
      act: null,
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
        if (this.other_material) {
          this.data.attic_overlapping_material = this.other_material
        }
        if (this.other_warming) {
          this.data.attic_overlapping_warming = this.other_warming
        }
        const resp = await this.$store.dispatch('sendConstructionInfo', this.data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
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

</style>