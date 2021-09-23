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
                <q-input outlined placeholder="Введите почту" type="email"
                         v-model="$v.contactInfo.director.email.$model"
                         :class="{invalid: !$v.contactInfo.director.email.email && $v.contactInfo.director.email.$dirty}"
                         error-message="Введите корректный Email"
                         :error="(!$v.contactInfo.director.email.email && $v.contactInfo.director.email.$dirty)"
                />
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
                <q-input outlined placeholder="Введите почту" type="email" v-model="$v.contactInfo.zavhoz.email.$model"
                         :class="{invalid: !$v.contactInfo.zavhoz.email.email && $v.contactInfo.zavhoz.email.$dirty}"
                         error-message="Введите корректный Email"
                         :error="(!$v.contactInfo.zavhoz.email.email && $v.contactInfo.zavhoz.email.$dirty)"
                />
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
                <q-input outlined placeholder="Введите почту" type="email" v-model="$v.contactInfo.updater.email.$model"
                         :class="{invalid: !$v.contactInfo.updater.email.email && $v.contactInfo.updater.email.$dirty}"
                         error-message="Введите корректный Email"
                         :error="(!$v.contactInfo.updater.email.email && $v.contactInfo.updater.email.$dirty)"
                />
              </div>
              <div v-if="!contactInfo.updater.prikaz" class="input-field-prikaz">
                <label>Приказ о назначении ответственного</label>
                <q-file
                    v-model="contactInfo.updater.prikaz"
                    outlined
                    label="Приказ о назначении ответственного"
                    hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                    max-total-size="25165824"
                    accept=".jpg, image/jpeg, .pdf"
                    @rejected="onRejected"
                    @input="changedPrikaz = true"
                />
              </div>
              <div v-else style="margin-bottom: 25px">
                <label>Приказ о назначении ответственного загружен</label>
                <div class="q-gutter-sm">
                  <button v-if="!changedPrikaz" class="btn waves-effect waves-light"
                          @click.prevent="showDoc(contactInfo.updater.prikaz)">
                    Просмотреть файл
                  </button>
                  <button class="btn waves-effect waves-light"
                          @click.prevent="contactInfo.updater.prikaz = null">
                    Изменить файл
                  </button>
                </div>
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
                <q-input outlined placeholder="Введите почту" type="email"
                         v-model="$v.contactInfo.bookkeeper.email.$model"
                         :class="{invalid: !$v.contactInfo.bookkeeper.email.email && $v.contactInfo.bookkeeper.email.$dirty}"
                         error-message="Введите корректный Email"
                         :error="(!$v.contactInfo.bookkeeper.email.email && $v.contactInfo.bookkeeper.email.$dirty)"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Слесарь-сантехник</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.plumberlocksmith.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.plumberlocksmith.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.plumberlocksmith.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон"
                         v-model="contactInfo.plumberlocksmith.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="q-ma-md">
              <h5><strong>Электрик</strong></h5>
              <div class="row">
                <div class="col">
                  <label>Фамилия</label>
                  <q-input outlined placeholder="Введите фамилию" v-model="contactInfo.electrician.last_name"/>
                </div>
                <div class="col">
                  <label>Имя</label>
                  <q-input outlined placeholder="Введите имя" v-model="contactInfo.electrician.first_name"/>
                </div>
                <div class="col">
                  <label>Отчество</label>
                  <q-input outlined placeholder="Введите отчество" v-model="contactInfo.electrician.patronymic"/>
                </div>
              </div>
              <div class="input-field-phone">
                <label>Телефон рабочий</label>
                <q-input outlined placeholder="Введите телефон"
                         v-model="contactInfo.electrician.phone"
                         mask="# (###) ### - ####"
                         fill-mask
                         type="tel"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="q-gutter-md">
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <button class="btn waves-effect waves-light" @click="returnBack">
            Отменить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {email} from 'vuelidate/lib/validators'
import {server_path} from "@/local_settings";

export default {
  name: "UpdateContacts",
  data: () => ({
    loading: true,
    changedPrikaz: false,
    prikaz: null,
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
      },
      plumberlocksmith: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
      },
      electrician: {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
      }
    },
  }),
  validations: {
    contactInfo: {
      director: {
        email: {email}
      },
      updater: {
        email: {email}
      },
      bookkeeper: {
        email: {email}
      },
      zavhoz: {
        email: {email}
      }
    }
  },
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
      this.contactInfo.plumberlocksmith = personal['plumberlocksmith']
      this.contactInfo.electrician = personal['electrician']
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
    async returnBack() {
      await this.$router.push(`/school/${this.$route.params['inn']}`)
    },
    async submitHandler() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        for (let i in this.contactInfo) {
          if (this.contactInfo[i].phone === '_ (___) ___ - ____' || this.contactInfo[i].phone === 8383) {
            this.contactInfo[i].phone = null
          }
        }
        if (this.contactInfo.updater.prikaz && !(typeof this.contactInfo.updater.prikaz === 'string' || this.contactInfo.updater.prikaz instanceof String)) {
          let form_data = new FormData()
          form_data.append('prikaz', this.contactInfo.updater.prikaz)
          form_data.append('INN', this.contactInfo.INN)
          await this.$store.dispatch('updatePersonalPrikaz', form_data)
        }
        delete this.contactInfo.updater.prikaz
        await this.$store.dispatch('updatePersonal', this.contactInfo)
        await this.$router.push(`/school/${this.contactInfo.INN}`)
      } catch (e) {
        console.log(e)
      }
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