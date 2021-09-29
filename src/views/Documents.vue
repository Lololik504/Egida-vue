<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Документация учреждения
        <router-link :to="`/schoolcard/${this.$route.params['id']}`">{{ shortname }}</router-link>
      </h4>
      <div class="input passport container center">
        <q-card flat bordered>
          <h5><b>Паспорт БТИ</b></h5>
          <div v-if="passport_BTI.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(passport_BTI.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="passport_BTI.url = null; passport_BTI.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('passport_BTI')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="passport_BTI.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                counter
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(passport_BTI, 'passport_BTI')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="passport_BTI.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input topographic_plan container center">
        <q-card flat bordered>
          <h5><b>Топографический план</b></h5>
          <div v-if="topographic_plan.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(topographic_plan.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="topographic_plan.url = null; topographic_plan.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('topographic_plan')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="topographic_plan.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                counter
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light"
                      @click.prevent="sendDoc(topographic_plan, 'topographic_plan')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="topographic_plan.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input teplosnabj_MK container center">
        <q-card flat bordered>
          <h5><b>МК на теплоснабжение</b></h5>
          <div v-if="teplosnabj_MK.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(teplosnabj_MK.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="teplosnabj_MK.url = null; teplosnabj_MK.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('teplosnabj_MK')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="teplosnabj_MK.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(teplosnabj_MK, 'teplosnabj_MK')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="teplosnabj_MK.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input vodosnabj_MK container center">
        <q-card flat bordered>
          <h5><b>МК на водоснабжение</b></h5>
          <div v-if="vodosnabj_MK.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(vodosnabj_MK.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="vodosnabj_MK.url = null; vodosnabj_MK.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('vodosnabj_MK')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="vodosnabj_MK.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                counter
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(vodosnabj_MK, 'vodosnabj_MK')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="vodosnabj_MK.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input electrosnabj container center">
        <q-card flat bordered>
          <h5><b>МК на электроснабжение</b></h5>
          <div v-if="electrosnabj_MK.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(electrosnabj_MK.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="electrosnabj_MK.url = null; electrosnabj_MK.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('electrosnabj_MK')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="electrosnabj_MK.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(electrosnabj_MK, 'electrosnabj_MK')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="electrosnabj_MK.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input land_title container center">
        <q-card flat bordered>
          <h5><b>Правоустанавливающие документы на землю</b></h5>
          <div v-if="land_title.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(land_title.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="land_title.url = null; land_title.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('land_title')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="land_title.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(land_title, 'land_title')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="land_title.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
      <div class="input building_title container center">
        <q-card flat bordered>
          <h5><b>Правоустанавливающие документы на здание</b></h5>
          <div v-if="building_title.hasUrl">
            <h6>Документ загружен</h6>
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="showDoc(building_title.url)">
                Просмотреть файл
              </button>
              <button class="btn waves-effect waves-light"
                      @click.prevent="building_title.url = null; building_title.hasUrl = false">
                Изменить файл
              </button>
              <button v-if="getPermission" class="btn waves-effect waves-light"
                      @click.prevent="deleteDoc('building_title')">
                Удалить файл
              </button>
            </div>
          </div>
          <div v-else>
            <h6>Документ не загружен</h6>
            <q-file
                v-model="building_title.url"
                outlined
                hint="Выберите файл размером не более 50МБ"
                max-total-size="52428800"
                accept=".jpg, .pdf, image/*"
                @rejected="onRejected"
            />
            <div class="q-gutter-sm">
              <button class="btn waves-effect waves-light" @click.prevent="sendDoc(building_title, 'building_title')">
                Сохранить
              </button>
              <button class="btn waves-effect waves" @click.prevent="building_title.url = null">
                Отменить
              </button>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>

import {server_path} from "@/local_settings";

export default {
  name: "Documents",
  data: () => ({
    loading: true,
    shortname: '',
    passport_BTI: {
      url: null,
      hasUrl: false
    },
    electrosnabj_MK: {
      url: null,
      hasUrl: false
    },
    teplosnabj_MK: {
      url: null,
      hasUrl: false
    },
    topographic_plan: {
      url: null,
      hasUrl: false
    },
    vodosnabj_MK: {
      url: null,
      hasUrl: false
    },
    land_title: {
      url: null,
      hasUrl: false
    },
    building_title: {
      url: null,
      hasUrl: false
    }
  }),
  methods: {
    async sendDoc(file, name) {
      try {
        this.loading = true
        if (file.url) {
          let formData = new FormData();
          formData.append('file', file.url)
          await this.$store.dispatch('sendDocs', {file: formData, inn: this.$route.params['id'], id: name})
          file.hasUrl = true
          await this.fetchDocs()
          this.$showMessage('successUploadFile')
        } else {
          this.$showMessage('failUploadFile')
        }
        this.loading = false
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
        this.loading = false
      }
    },
    async deleteDoc(fileName) {
      try {
        await this.$store.dispatch('deleteDocs', {inn: this.$route.params['id'], id: fileName})
        this[fileName].hasUrl = false;
        this[fileName].url = null;
        this.$showMessage('deleteSuccess')
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
    async fetchDocs() {
      try {
        const token = localStorage.getItem('token')
        const inn = this.$route.params['id']
        const docs = await this.$store.dispatch('fetchDocs', {token, inn})
        this.passport_BTI.url = docs['passport_BTI']
        this.passport_BTI.url ? this.passport_BTI.hasUrl = true : this.passport_BTI.hasUrl = false
        this.electrosnabj_MK.url = docs['electrosnabj_MK']
        this.electrosnabj_MK.url ? this.electrosnabj_MK.hasUrl = true : this.electrosnabj_MK.hasUrl = false
        this.teplosnabj_MK.url = docs['teplosnabj_MK']
        this.teplosnabj_MK.url ? this.teplosnabj_MK.hasUrl = true : this.teplosnabj_MK.hasUrl = false
        this.topographic_plan.url = docs['topographic_plan']
        this.topographic_plan.url ? this.topographic_plan.hasUrl = true : this.topographic_plan.hasUrl = false
        this.vodosnabj_MK.url = docs['vodosnabj_MK']
        this.vodosnabj_MK.url ? this.vodosnabj_MK.hasUrl = true : this.vodosnabj_MK.hasUrl = false
        this.building_title.url = docs['building_title']
        this.building_title.url ? this.building_title.hasUrl = true : this.building_title.hasUrl = false
        this.land_title.url = docs['land_title']
        this.land_title.url ? this.land_title.hasUrl = true : this.land_title.hasUrl = false
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  computed: {
    getPermission() {
      if (this.$store.getters.permission)
        return this.$store.getters.permission <= 10
      else return localStorage.getItem('permission') <= 10
    }
  },
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['id']
      if (!Object.keys(info).length || info['INN'] !== inn) {
        info = await this.$store.dispatch('fetchInfo', {token, inn})
      }
      await this.fetchDocs()
      this.shortname = info['shortname']
      this.loading = false

    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.input {
  margin: 25px auto;
}
</style>