<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Наказы учреждения
        <router-link :to="`/schoolcard/${this.$route.params['id']}`">{{ shortname }}</router-link>
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
            <li><a @click="send($event.target.id)" id="sovet">Реализация наказов избирателей Совета депутатов г. Новосибирска</a></li>
            <li><a @click.prevent="send($event.target.id)" id="sobranie">Реализация наказов избирателей депутатов Законодательного собрания НСО</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
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