<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Предписания надзорных органов / судебные решения учреждения
        <router-link :to="`/schoolcard/${this.$route.params['id']}`">{{ shortname }}</router-link>
      </h4>
      <div class="q-gutter-sm">
        <button class="btn waves-effect waves-light">
          <router-link
              :to="`/create_prescription/${this.$route.params['id']}`"
              style="text-decoration: none; color: white;"
          >
            Создать новое предписание
          </router-link>
        </button>
      </div>
      <div class="mainBlock">
        <div class="menuBlock">
          <ul>
            <li><a @click.prevent="send($event.target.id)" id="rospotreb">Роспотребнадзор</a></li>
            <li><a @click="send($event.target.id)" id="gospozh">Госпожнадзор</a></li>
            <li><a @click="send($event.target.id)" id="rostech">Ростехнадзор</a></li>
            <li><a @click="send($event.target.id)" id="sudeb">Судебные решения</a></li>
            <li><a @click="send($event.target.id)" id="otherorders">Прочие надзорные органы</a></li>
          </ul>
        </div>
        <div class="cardsBlock" v-if="choosenPrescription">
          <Loader v-if="loadingCards"/>
          <div v-else-if="currentPrescription.length" class="card" v-for="(item, index) in currentPrescription"
               :key="item.id">
            <h5>Предписание №{{ index + 1 }}</h5>
            <table class="main-info">
              <tbody>
              <tr class="inn">
                <th>Дата вынесения предписания</th>
                <td v-if="item.date_order">{{ item.date_order }}</td>
                <td v-else>-</td>
              </tr>
              <tr class="inn">
                <th>Вид работ</th>
                <td v-if="item.type_work">{{ item.type_work }}</td>
                <td v-else>-</td>
              </tr>
              <tr class="inn">
                <th>Сумма</th>
                <td v-if="item.summa">{{ item.summa }} тыс.руб.</td>
                <td v-else>-</td>
              </tr>
              <tr class="inn">
                <th>Срок исполнения</th>
                <td v-if="item.period_execution">{{ item.period_execution }}</td>
                <td v-else>-</td>
              </tr>
              <tr class="inn">
                <th>Скан предписания</th>
                <td v-if="item.order" @click.prevent="showDoc(item.order)">Прикреплен (открыть при нажатии)</td>
                <td v-else>-</td>
              </tr>
              </tbody>
            </table>
            <br>
            <button class="btn waves-effect waves-light center" @click.prevent="toUpdate(item.id)">
              Редактировать данные предписания
            </button>
          </div>
          <div v-else>
            <h5>Данные предписания отсутствуют</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {server_path} from "@/local_settings";

export default {
  name: "Prescriptions",
  data: () => ({
    loading: true,
    loadingCards: null,
    allPrescriptions: ['Роспотребнадзор', 'Госпожнадзор', 'Ростехнадзор', 'Судебные решения', 'Прочие надзорные органы'],
    choosenPrescription: null,
    currentPrescription: null,
    currentURL: null
  }),
  methods: {
    async send(url) {
      this.loadingCards = true
      this.currentURL = url
      this.choosenPrescription = true
      const token = localStorage.getItem('token')
      const inn = this.$route.params['id']
      this.currentPrescription = await this.$store.dispatch('fetchPrescription', {token, inn, url})
      this.currentPrescription = this.currentPrescription[url]
      this.loadingCards = false
    },
    showDoc(url) {
      const link = document.createElement('a');
      link.href = server_path + url;
      link.target = '_blank'
      document.body.appendChild(link);
      link.click();
    },
    async toUpdate(id) {
      await this.$router.push(`/update_prescription/${this.currentURL}/${id}`)
      window.scrollTo(0, 0)
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
      this.shortname = info['shortname']
      this.loading = false

    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}

li {
  width: 20%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #555555;
  text-align: center;
  font-weight: bold;
}

li:hover {
  text-decoration: underline;
  background: #c1c1c1;
  cursor: pointer;
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

.menuBlock {
  margin: 20px auto;
}

h5 {
  text-align: center;
}
</style>