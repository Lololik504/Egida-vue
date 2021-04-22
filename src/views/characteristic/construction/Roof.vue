<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Кровля</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Площадь кровли, кв. м.</label>
            <q-input outlined :disable="disable" step="0.001" type="number" v-model.number="data.roof_square"/>
          </div>
          <div v-if="!data.roof_photo" class="input-roof-photo">
            <label>Фото кровли</label>
            <q-file
                v-model="data.roof_photo"
                outlined
                :disable="disable"
                hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                max-total-size="25165824"
                accept=".jpg, image/jpeg, .pdf"
                @rejected="onRejected"
                @input="changedPhoto = true"
            />
          </div>
          <div v-else style="margin-bottom: 25px">
            <label>Фото кровли загружено</label>
            <div class="q-gutter-sm">
              <button v-if="!changedPhoto" class="btn blue" @click.prevent="showDoc(data.roof_photo)">
                Просмотреть файл
              </button>
              <button class="btn blue"
                      @click.prevent="data.roof_photo = null;">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn blue"
                      @click.prevent="deleteDoc('roof_photo')">
                Удалить файл
              </button>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип кровли</label>
            <div class="select">
              <q-select multiple outlined :disable="disable" v-model="data.roof_type" :options="roof_types"/>
            </div>
          </div>
          <div v-if="data.roof_type.includes(roof_types[3])">
            <label>Введите тип кровли</label>
            <q-input outlined :disable="disable" v-model="other_type"/>
          </div>
          <div class="select-material-field">
            <label>Материал кровли</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.roof_material" :options="roof_materials"/>
            </div>
          </div>
          <div v-if="data.roof_material === roof_materials[6]">
            <label>Введите материал кровли</label>
            <q-input outlined :disable="disable" v-model="other_material"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние кровли:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.roof_status" val="Исправное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.roof_status" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.roof_status" val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.roof_status" val="Недопустимое состояние"/>
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
                    <q-radio :disable="disable" v-model="data.roof_status" val="Аварийное состояние"/>
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
          <div v-if="!data.roof_act" class="input-roof-photo">
            <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
            <q-file
                v-model="data.roof_act"
                :disable="disable"
                outlined
                hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                max-total-size="25165824"
                accept=".jpg, image/jpeg, .pdf"
                @rejected="onRejected"
                @input="changedAct = true"
            />
          </div>
          <div v-else style="margin-bottom: 25px">
            <label>Акт обследования технического состояния загружен</label>
            <div class="q-gutter-sm">
              <button v-if="!changedAct" class="btn blue"
                      @click.prevent="showDoc(data.roof_act)">
                Просмотреть файл
              </button>
              <button class="btn blue"
                      @click.prevent="data.roof_act = null;">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn blue"
                      @click.prevent="deleteDoc('roof_act')">
                Удалить файл
              </button>
            </div>
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
import {server_path} from "@/local_settings";

export default {
  name: "Roof",
  data: () => ({
    roof_types: ['Скатная', 'Мягкая', 'Скатная/мягкая', 'Прочее'],
    roof_materials: [
      'Битумный наплавляемый',
      'Полимерная или резиновая мембрана',
      'Напыляемое многослойное покрытие',
      'Волнистые асбестоцементные листы (шифер)',
      'Оцинкованные металлические профилированные листы (профлист, металлочерепица)',
      'Оцинкованные металлические плоские листы (фальцевое соединение)',
      'Прочее'
    ],
    other_material: null,
    other_type: null,
    loading: true,
    disable: true,
    changedPhoto: false,
    changedAct: false,
    data: {
      id: null,
      roof_type: [],
      roof_material: null,
      roof_status: null,
      roof_act: null,
      roof_square: null,
      roof_photo: null
    }
  }),
  computed: {
    getPermission() {
      return this.$store.getters.permission <= 10
    }
  },
  methods: {
    async deleteDoc(filename) {
      try {
        if (this.data.[filename]) {
          await this.$store.dispatch('deleteConstructionDoc', {id: this.data.id, doc_id: filename})
          this.data.[filename] = null
          this.$showMessage('deleteSuccess')
        } else this.$showMessage('error')
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
    onRejected() {
      this.$error('Файл слишком велик!')
    },
    showDoc(url) {
      const link = document.createElement('a');
      link.href = server_path + url;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
    },
    async save() {
      try {
        if (this.other_material) {
          this.data.roof_material = this.other_material
        }
        if (this.other_type) {
          this.data.roof_type.splice(this.data.roof_type.indexOf('Прочее'), 1, this.other_type)
        }
        if (this.data.roof_type.includes('')) {
          this.data.roof_type.splice(this.data.roof_type.indexOf(''), 1)
        }
        let form_data = new FormData();
        for (let key in this.data) {
          if ((key === 'roof_photo' && typeof this.data[key] === 'string') || (key === 'roof_act' && typeof this.data[key] === 'string')) {
            continue
          }
          (key === 'roof_square' && (this.data[key] === '' || this.data[key] == null)) ? this.data[key] = 0 : null
          form_data.append(key, this.data[key]);
        }
        const resp = await this.$store.dispatch('sendConstructionInfo', form_data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.other_material = null
          this.changedPhoto = false;
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
        const info = await this.$store.dispatch('fetchConstruction', {token, id})
        const tmp = Object.keys(this.data)
        for (let item in info) {
          info[item] === '/media/null' ? info[item] = null : null
          info[item] === 'null' ? info[item] = null : null
          if (tmp.includes(item)) {
            this.data[item] = info[item]
          }
        }
        this.data['id'] = id
        if (this.data.roof_type !== null)
          this.data.roof_type = this.data.roof_type.split()
        else this.data.roof_type = []
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
.select {
  margin-bottom: 1px;
}
</style>