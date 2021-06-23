<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Наказы учреждения
        <router-link :to="`/schoolcard/${this.$route.params['id']}`">{{ this.shortname }}</router-link>
      </h4>
      <div class="q-gutter-sm">
        <button class="btn waves-effect waves-light">
          <router-link
              :to="`/create_order/${this.$route.params['id']}`"
              style="text-decoration: none; color: white;"
          >
            Создать новый наказ
          </router-link>
        </button>
      </div>
      <div class="mainBlock">
        <div class="menuBlock">
          <ul>
            <li><a @click.prevent="send($event.target.id)" id="mandatecouncil">Реализация наказов избирателей Совета депутатов г. Новосибирска</a></li>
            <li><a @click.prevent="send($event.target.id)" id="mandateassembly">Реализация наказов избирателей депутатов Законодательного собрания НСО</a></li>
          </ul>
        </div>
      </div>
      <div class="cardsBlock" v-if="choosenOrder">
        <Loader v-if="loadingCards"/>
        <div v-else-if="currentOrder.length" class="card" v-for="(item, index) in currentOrder"
             :key="item.id">
          <h5>Наказ №{{ index + 1 }}</h5>
          <table class="main-info">
            <tbody>
            <tr class="inn">
              <th>ФИО</th>
              <td v-if="item.deputy">{{ item.deputy }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>№ наказа</th>
              <td v-if="item.number">{{ item.number }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Округ</th>
              <td v-if="item.region">{{ item.region }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Общая стоимость реализации наказа избирателей (тыс.руб.)</th>
              <td v-if="item.total_price">{{ item.total_price }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Местный бюджет (тыс.руб.)</th>
              <td v-if="item.local_budget">{{ item.local_budget }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Областной бюджет (тыс.руб.)</th>
              <td v-if="item.regional_budget">{{ item.regional_budget }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Федеральный бюджет (тыс.руб.)</th>
              <td v-if="item.federal_budget">{{ item.federal_budget }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Назначение наказа</th>
              <td v-if="item.appointment">{{ item.appointment }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Содержание наказа избирателей</th>
              <td v-if="item.content">{{ item.content }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Мероприятия по реализации наказа избирателей</th>
              <td v-if="item.event">{{ item.event }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Срок исполнения наказа</th>
              <td v-if="item.period_execution">{{ item.period_execution }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Включение в приказ текущего года по ремонтным работам</th>
              <td v-if="item.current_year">Включено</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Ответственный исполнитель за выполнение мероприятий по реализации наказа избирателей</th>
              <td v-if="item.executor">{{ item.executor }}</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Согласование наказа</th>
              <td v-if="item.agreed">Согласован</td>
              <td v-else>-</td>
            </tr>
            <tr class="inn">
              <th>Файл согласования</th>
              <td v-if="item.file" @click.prevent="showDoc(item.file)">Прикреплен (открыть при нажатии)</td>
              <td v-else>-</td>
            </tr>
            </tbody>
          </table>
          <br>
          <button class="btn waves-effect waves-light center" @click.prevent="toUpdate(item.id)">
            Редактировать данные назака
          </button>
        </div>
        <div v-else>
          <h5>Данные наказы отсутствуют</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {server_path} from "@/local_settings";

export default {
  name: "Orders",
  data: () => ({
    loading: true,
    loadingCards: null,
    choosenOrder: null,
    currentOrder: null,
    currentURL: null
  }),
  methods: {
    async send(url) {
      this.loadingCards = true
      this.currentURL = url
      this.choosenOrder = true
      const token = localStorage.getItem('token')
      const inn = this.$route.params['id']
      this.currentOrder = await this.$store.dispatch('fetchOrder', {token, inn, url})
      this.currentOrder = this.currentOrder['mandates']
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
      await this.$router.push(`/update_order/${this.currentURL}/${id}`)
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
  justify-content: space-evenly;
}

li {
  width: 40%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #555555;
  text-align: center;
  font-weight: bold;
}

li:hover, a:hover {
  text-decoration: underline;
  background: #c1c1c1;
  cursor: pointer;
}

</style>