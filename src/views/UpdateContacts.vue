<template>
  <div class="container" style="width: 80%">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Редактирование контактных данных учреждения
        <router-link :to="`/school/${this.$route.params['inn']}`">{{ shortname }}</router-link>
      </h4>
      <form @submit.prevent="submitHandler">
        <div class="q-pa-sm">
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Руководство образовательного учреждения</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.director.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.director.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.director.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон" v-model="contactInfo.director.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />
              </div>
              <div class="input-field-email">
                <label>Электронная почта</label>
                <q-input outlined placeholder="Введите почту" type="email" v-model="contactInfo.director.email"/>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Заместитель директора по административно-хозяйственной части / завхоз</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.zavhoz.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.zavhoz.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.zavhoz.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон" v-model="contactInfo.zavhoz.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />
              </div>
              <div class="input-field-email">
                <label>Электронная почта</label>
                <q-input outlined placeholder="Введите почту" type="email" v-model="contactInfo.zavhoz.email"/>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Ответственный за заполнение данных</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.updater.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.updater.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.updater.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон" v-model="contactInfo.updater.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />

              </div>
              <div class="input-field-email">
                <label>Электронная почта</label>
                <q-input outlined placeholder="Введите почту" type="email" v-model="contactInfo.updater.email"/>
              </div>
              <div class="input-field-prikaz">
                <label>Приказ о назначении ответственного</label>
                <q-file
                    v-model="contactInfo.updater.prikaz"
                    outlined
                    label="Приказ о назначении ответственного"
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    multiple
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                />

              </div>
            </div>
          </div>
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Главный бухгалтер</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.bookkeeper.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.bookkeeper.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.bookkeeper.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон"
                         v-model="contactInfo.bookkeeper.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />
              </div>
              <div class="input-field-email">
                <label>Электронная почта</label>
                <q-input outlined placeholder="Введите почту" type="email" v-model="contactInfo.bookkeeper.email"/>
              </div>
            </div>
          </div>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateContacts",
  data: () => ({
    loading: true,
    filesImages: null,
    shortname: null,
    contactInfo: {
      INN: null,
      director: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        email: null
      },
      zavhoz: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        email: null
      },
      updater: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        email: null,
        prikaz: null
      },
      bookkeeper: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        email: null
      }
    },
  }),
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const inn = this.$route.params['inn']
      const info = await this.$store.dispatch('fetchInfo', {token, inn})

      const personal = await this.$store.dispatch('fetchPersonal', inn)

      this.contactInfo.director = personal['director']
      this.contactInfo.zavhoz = personal['zavhoz']
      this.contactInfo.updater = personal['updater']
      this.contactInfo.bookkeeper = personal['bookkeeper']
      this.contactInfo.INN = info['INN']
      this.shortname = info['shortname']
      for (let i in this.contactInfo) {
        if (this.contactInfo[i].phone === null) {
          this.contactInfo[i].phone = 8383
        }
      }

      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async submitHandler() {
      try {
        console.log('contact')
        console.log(this.contactInfo)
        for (let i in this.contactInfo) {
          if (this.contactInfo[i].phone === '_ (___) ___ - ____' || this.contactInfo[i].phone === 8383) {
            this.contactInfo[i].phone = null
          }
        }
        await this.$store.dispatch('updatePersonal', this.contactInfo)
        await this.$router.push(`/school/${this.contactInfo.INN}`)
      } catch (e) {
        console.log(e)
      }
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }
  }
}
</script>

<style scoped>
.col {
  margin: 0 50px;
  width: 500px;
}
</style>