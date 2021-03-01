<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4 class="center">Учреждение
        <router-link :to="`/schoolcard/${this.$route.params['school']}`"> {{ mainInfo.shortname }}</router-link>
      </h4>
      <div class="card" >
        <h4>Основные сведения учреждения</h4>
        <table class="main-info">
          <tbody>
          <tr class="inn">
            <th>ИНН</th>
            <td>{{ mainInfo.INN }}</td>
          </tr>
          <tr class="inn">
            <th>Краткое название</th>
            <td>{{ mainInfo.shortname }}</td>
          </tr>
          <tr class="inn">
            <th>Полное название</th>
            <td>{{ mainInfo.name }}</td>
          </tr>
          <tr class="inn">
            <th>Вид организационно-правовой формы</th>
            <td>{{ mainInfo.form_type }}</td>
          </tr>
          <tr class="inn">
            <th>Вид образования</th>
            <td>{{ mainInfo.edu_type }}</td>
          </tr>
          </tbody>
        </table>
        <br>
        <button class="btn waves-effect waves-light center" @click.prevent="toUpdateInfo">
          Редактировать основные сведения
        </button>
      </div>

      <div class="card">
        <h4>Контактные данные</h4>
        <div class="director">
          <h5 class="center-align">Руководство образовательного учреждения</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ contactInfo.director.last_name }} {{ contactInfo.director.first_name }}
                {{ contactInfo.director.patronymic }}
              </td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ contactInfo.director.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ contactInfo.director.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="zavhoz">
          <h5 class="center-align">Заместитель директора по административно-хозяйственной части / завхоз</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ contactInfo.zavhoz.last_name }} {{ contactInfo.zavhoz.first_name }}
                {{ contactInfo.zavhoz.patronymic }}
              </td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ contactInfo.zavhoz.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ contactInfo.zavhoz.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="updater">
          <h5 class="center-align">Ответственный за заполнение данных</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ contactInfo.updater.last_name }} {{ contactInfo.updater.first_name }}
                {{ contactInfo.updater.patronymic }}
              </td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ contactInfo.updater.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ contactInfo.updater.email }}</td>
            </tr>
            <tr class="prikaz">
              <th>Приказ о назначении ответственного</th>
              <td>{{ contactInfo.updater.prikaz }}</td>
            </tr>
            </tbody>
          </table>
          <br>
        </div>
        <div class="bookkeeper">
          <h5 class="center-align">Главный бухгалтер</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ contactInfo.bookkeeper.last_name }} {{ contactInfo.bookkeeper.first_name }}
                {{ contactInfo.bookkeeper.patronymic }}
              </td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ contactInfo.bookkeeper.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ contactInfo.bookkeeper.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <br>
        <button class="btn waves-effect waves-light center" @click.prevent="toUpdateContacts">
          Редактировать контактные данные
        </button>
      </div>
      <div class="card">
        <h4>Реквизиты, адреса учреждения</h4>
        <table class="main-info">
          <tbody>
          <tr class="site">
            <th>Официальный сайт</th>
            <td>{{ requisites.official_site }}</td>
          </tr>
          <tr class="address">
            <th>Юридический адрес</th>
            <td>{{ requisites.legal_address_street }}, {{ requisites.legal_address_number }}</td>
          </tr>
          <tr class="district">
            <th>Территориальная принадлежность</th>
            <td>{{ requisites.district }}</td>
          </tr>
          <tr class="date">
            <th>Дата образования юр.лица</th>
            <td>{{ requisites.formation_date }}</td>
          </tr>
          </tbody>
        </table>
        <br>
        <button class="btn waves-effect waves-light center" @click.prevent="toUpdateRequisites">
          Редактировать реквизиты
        </button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'school',
  data: () => ({
    mainInfo: {
      INN: null,
      form_type: null,
      edu_type: null,
      shortname: null,
      name: null,
    },
    requisites: {
      legal_address_street: null,
      legal_address_number: null,
      district: null,
      official_site: null,
      formation_date: null
    },
    contactInfo: {
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
    loading: true
  }),
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const inn = this.$route.params['school']
      const info = await this.$store.dispatch('fetchInfo', {token, inn})
      const personal = await this.$store.dispatch('fetchPersonal', inn)
      const requisite = await this.$store.dispatch('fetchRequisites', inn)

      this.mainInfo.INN = info['INN']
      this.mainInfo.name = info['name']
      this.mainInfo.edu_type = info['edu_type']
      this.mainInfo.form_type = info['form_type']
      this.mainInfo.shortname = info['shortname']

      this.contactInfo.director = personal['director']
      this.contactInfo.zavhoz = personal['zavhoz']
      this.contactInfo.updater = personal['updater']
      this.contactInfo.bookkeeper = personal['bookkeeper']

      if (requisite.requisites.district) {
        this.requisites.district = requisite.requisites.district.name
      } else {
        this.requisites.district = null
      }
      this.requisites.formation_date = requisite.requisites['formation_date']
      this.requisites.official_site = requisite.requisites['official_site']
      this.requisites.legal_address_street = requisite.requisites['legal_address_street']
      this.requisites.legal_address_number = requisite.requisites['legal_address_number']

      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    toUpdateInfo() {
      this.$router.push(`/update_school_info/${this.$route.params['school']}`)
    },
    toUpdateContacts() {
      this.$router.push(`/update_contact_info/${this.$route.params['school']}`)
    },
    toUpdateRequisites() {
      this.$router.push(`/update_requisite_info/${this.$route.params['school']}`)

    }
  }

}
</script>

<style scoped>
.card {
  display: flex;
}

h4 {
  margin: 20px auto;
}


table {
  width: 60%;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
}

tr {
  display: table-row;
}

th {
  text-align: right;
  border: 1px gray solid;
  padding: 10px;
  width: 100px;

}

td {
  padding: 5px;
  text-align: center;
  border: 1px gray solid;
}

.main-info {
  margin: 10px auto;
}

</style>