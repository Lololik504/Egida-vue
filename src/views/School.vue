<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Учереждение
        <router-link :to="`/schoolcard/${this.$route.params['school']}`"> {{ mainInfo.shortname }}</router-link>
      </h4>
      <div class="card">
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
            <td>{{ mainInfo.fullname }}</td>
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
        <button class="btn waves-effect waves-light right">
          Редактировать основные сведения
        </button>
      </div>

      <div class="card">
        <h4>Контактные данные</h4>
        <div class="director">
          <h5>Руководство образовательного учреждения</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ director.fio }}</td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ director.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ director.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="zavhoz">
          <h5>Заместитель директора по административно-хозяйственной части / завхоз</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ zavhoz.fio }}</td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ zavhoz.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ zavhoz.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="updater">
          <h5>Ответственный за заполнение данных</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ updater.fio }}</td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ updater.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ updater.email }}</td>
            </tr>
            <tr class="prikaz">
              <th>Приказ о назначении ответственного</th>
              <td>{{ updater.prikaz }}</td>
            </tr>
            </tbody>
          </table>
          <br>
        </div>
        <div class="bookkeeper">
          <h5>Главный бухгалтер</h5>
          <table class="main-info">
            <tbody>
            <tr class="fio">
              <th>ФИО</th>
              <td>{{ bookkeeper.fio }}</td>
            </tr>
            <tr class="phone">
              <th>Телефон рабочий</th>
              <td>{{ bookkeeper.phone }}</td>
            </tr>
            <tr class="email">
              <th>Электронная почта</th>
              <td>{{ bookkeeper.email }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <br>
        <button class="btn waves-effect waves-light right">
          Редактировать контактные данные
        </button>
      </div>
      <div class="card">
        <h4>Реквизиты, адреса учреждения</h4>
        <table class="main-info">
          <tbody>
          <tr class="site">
            <th>Официальный сайт</th>
            <td>{{ rekvizit.site }}</td>
          </tr>
          <tr class="address">
            <th>Юридический адрес</th>
            <td>{{ rekvizit.address }}</td>
          </tr>
          <tr class="district">
            <th>Территориальная принадлежность</th>
            <td>{{ rekvizit.district }}</td>
          </tr>
          <tr class="date">
            <th>Дата образования юр.лица</th>
            <td>{{ rekvizit.date }}</td>
          </tr>
          </tbody>
        </table>
        <br>
        <button class="btn waves-effect waves-light right">
          Редактировать реквизиты
        </button>
      </div>

      <!--      <p>ИНН:-->
      <!--        <span>{{ INN }}</span>-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        Район:-->
      <!--        <span v-on:click="changeData">{{ district }}</span>-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        Краткое наименование:-->
      <!--        <span v-on:click="changeData">{{ shortname }}</span>-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        Полное наименование:-->
      <!--        <span v-on:click="changeData">{{ fullname }}</span>-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        Телефон:-->
      <!--        <span v-on:click="changeData">{{ phone }}</span>-->
      <!--      </p>-->
      <!--      <p>-->
      <!--        Адрес:-->
      <!--        <span v-on:click="changeData">{{ address }}</span>-->
      <!--      </p>-->
    </div>
    <button class="btn waves-effect waves-light" v-on:click="toBuilding">
      Здания
    </button>
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
      fullname: null,
    },
    rekvizit: {
      address: null,
      district: null,
      site: null,
      date: null
    },
    director: {
      fio: null,
      phone: null,
      email: null
    },
    zavhoz: {
      fio: null,
      phone: null,
      email: null
    },
    updater: {
      fio: null,
      phone: null,
      email: null,
      prikaz: null
    },
    bookkeeper: {
      fio: null,
      phone: null,
      email: null
    },
    loading: true
  }),
  async mounted() {
    try {
      let info = this.$store.getters.info
      const token = localStorage.getItem('token')
      const inn = this.$route.params['school']
      if (!Object.keys(info).length || info['INN'] !== inn) {
        info = await this.$store.dispatch('fetchInfo', {token, inn})
        console.log(info)
      }
      this.mainInfo.INN = info['INN']
      this.mainInfo.fullname = info['name']
      this.phone = info['phone']
      this.mainInfo.shortname = info['shortname']
      this.rekvizit.district = info['district']
      this.address = info['address']
      this.mainInfo.edu_type = info['edu_type']
      this.mainInfo.form_type = info['form_type']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async changeData(value) {
      const newData = prompt("Введите новые данные:", value.toElement['textContent'])
      const val = Object.values(this.$data)
      const keys = Object.keys(this.$data)
      var tmp = ''
      for (let k in val) {
        if (val[k] === value.toElement['textContent']) {
          tmp = keys[k]
        }
      }
      if (newData != null && newData !== '') {
        this.$data[tmp] = newData
        await this.$store.dispatch('updateInfo', this.$data)
      }

    },
    toBuilding() {
      this.$router.push(`/schoolbuilding/${this.$route.params['school']}`)
    }
  }

}
</script>

<style scoped>
.card {
  display: flex;
}

table {
  width: 60%;
  /*align-self: center;*/
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

.right {
  width: 400px;
}

</style>