<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Фундамент</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div v-if="!data.foundation_photo" class="input-roof-photo">
            <label>Фото фундамента</label>
            <q-file
                v-model="data.foundation_photo"
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
            <label>Фото фундамента загружено</label>
            <div class="q-gutter-sm">
              <button v-if="!changedPhoto" class="btn blue" @click.prevent="showDoc(data.foundation_photo)">
                Просмотреть файл
              </button>
              <button class="btn blue"
                      @click.prevent="data.foundation_photo = null;">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn blue"
                      @click.prevent="deleteDoc('foundation_photo')">
                Удалить файл
              </button>
            </div>
          </div>
          <div class="select-type-field">
            <label>Тип фундамента</label>
            <div class="select">
              <q-select outlined :disable="disable" v-model="data.foundation_type" :options="foundation_types"/>
            </div>
          </div>
          <div v-if="data.foundation_type === foundation_types[8]">
            <label>Введите тип фундамента</label>
            <q-input outlined :disable="disable" v-model="other_type"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Общее техническое состояние фундамента:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio :disable="disable" v-model="data.foundation_status" val="Исправное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.foundation_status" val="Работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.foundation_status"
                             val="Ограниченно работоспособное состояние"/>
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
                    <q-radio :disable="disable" v-model="data.foundation_status" val="Недопустимое состояние"/>
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
                    <q-radio :disable="disable" v-model="data.foundation_status" val="Аварийное состояние"/>
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
          <div v-if="!data.foundation_act" class="input-roof-photo">
            <label>Акт обследования технического состояния (экспертной оценки специализированной
              организации)</label>
            <q-file
                v-model="data.foundation_act"
                outlined
                :disable="disable"
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
              <button v-if="!changedAct" class="btn blue" @click.prevent="showDoc(data.foundation_act)">
                Просмотреть файл
              </button>
              <button class="btn blue"
                      @click.prevent="data.foundation_act = null;">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn blue"
                      @click.prevent="deleteDoc('foundation_act')">
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
  name: "Foundation",
  data: () => ({
    loading: true,
    foundation_types: [
      'Ленточный фундамент',
      'Столбчатый фундамент',
      'Монолитный ленточный фундамент',
      'Свайный фундамент',
      'Мелкозаглубленный фундамент',
      'Плитный фундамент',
      'Плавающий фундамент',
      'Винтовой фундамент',
      'Прочее'
    ],
    other_type: null,
    disable: true,
    changedAct: false,
    changedPhoto: false,
    data: {
      id: null,
      foundation_status: null,
      foundation_type: null,
      foundation_act: null,
      foundation_photo: null
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
    async save() {
      try {
        if (this.other_type) {
          this.data.foundation_type = this.other_type
        }
        let form_data = new FormData();
        for (let key in this.data) {
          if ((key === 'foundation_photo' && typeof this.data[key] === 'string') || (key === 'foundation_act' && typeof this.data[key] === 'string')) {
            continue
          }
          form_data.append(key, this.data[key]);
        }
        const resp = await this.$store.dispatch('sendConstructionInfo', form_data)
        if (resp['status'] === 200) {
          this.showMessage('saveSuccess')
          this.disable = true
          this.other_type = null
          this.changedAct = false
          this.changedPhoto = false
          await this.loadingPage()
        }
      } catch (e) {
        console.log(e)
        this.showMessage('error')
      }
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