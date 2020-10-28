<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Список учреждений</h4>
      <DistrictList
          :districts="districts"
      />
      <br/>
      <div class="q-gutter-md">
        <button class="btn waves-effect waves-light" v-on:click="exportData">
          Экспорт данных
        </button>
        <button class="btn waves-effect waves-light" v-on:click="dialog = true">
          Мастер выгрузки
        </button>
        <button class="btn waves-effect waves-light" v-on:click="toCreateSchool">
          Добавить учреждение
        </button>
      </div>
      <div class="q-pa-md q-gutter-sm">
        <q-dialog
            v-model="dialog"
            persistent
            :maximized="true"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
          <q-card class="bg-teal-7 text-white">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Мастер выгрузки</div>
              <q-space/>
              <q-btn icon="close" flat dense v-close-popup/>
            </q-card-section>
            <q-separator color="teal-10"/>

            <q-card-section class="q-pt-md-lg">
              <div class="q-pa-md">
                <div class="q-gutter-xs row inline items-baseline">
                  <div class="column">
                    <q-checkbox class="col" v-model="isMainInfo" label="Основные сведения" color="orange"/>
                    <div class="col" style="height: 250px; width: 250px;" v-if="isMainInfo">
                      <q-checkbox class="col" color="orange"
                                  v-for="(info,key,index) in mainInfo"
                                  :key="index"
                                  :label="info"
                                  :value="mainStates[key]"
                                  v-model="mainStates[key]"
                      />
                    </div>
                  </div>
                  <div class="column inline items-baseline">
                    <q-checkbox class="col" v-model="isBuildInfo" label="Cведения о здании" color="orange"/>
                    <div class="col" style="height: 250px; width: 250px" v-if="isBuildInfo">
                      <q-checkbox class="col" color="orange"
                                  v-for="(info,key) in buildInfo"
                                  :key="key"
                                  :label="info"
                                  :value="buildStates[key]"
                                  v-model="buildStates[key]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn waves-effect waves-light" @click.prevent="sendInfo">
                Послать
              </button>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";

export default {
  name: "Districts",
  components: {DistrictList},
  data: () => ({
    districts: [],
    test: [],
    mainInfo: {},
    buildInfo: {},
    mainStates: {},
    buildStates: {},
    isMainInfo: false,
    isBuildInfo: false,
    loading: true,
    error: false,
    dialog: false,
    maximizedToggle: false
  }),
  methods: {
    async exportData() {
      try {
        await this.$store.dispatch('exportInfo')
      } catch (e) {
        console.log(e)
      }
    },
    show() {
      console.log('nevizhy')
      console.log(this.mainStates)
    },
    async sendInfo() {
      try {
        let data = {}
        if (this.isBuildInfo) {
          data['building'] = this.buildStates
        }
        if (this.isMainInfo) {
          data['school'] = this.mainStates
        }
        console.log(data)
        if (!Object.keys(data).length) {
          alert('Для отправки выберите поля!')
        } else {
          await this.$store.dispatch('sendMainInfo', data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    toCreateSchool() {
      this.$router.push('/create_school')
    }
  },
  beforeCreate() {
    const per = localStorage.getItem('permission')
    if (!(per === '5' || per === '1' || per === '10')) {
      alert("У вас недостаточно прав!")
      this.$router.push('/')
    }
  },
  async mounted() {
    try {
      this.districts = await this.$store.dispatch('fetchDistricts')
      this.buildInfo = await this.$store.dispatch('fetchFieldsBuilding')
      await this.$store.dispatch('fetchAllModels')
      this.mainInfo = await this.$store.dispatch('fetchFieldsSchool')
      this.mainStates = Object.assign({}, this.mainInfo)
      for (let key in this.mainStates) {
        this.mainStates[key] = true
      }
      this.buildStates = Object.assign({}, this.buildInfo)
      for (let key in this.buildInfo) {
        this.buildStates[key] = true
      }
      this.loading = false
    } catch (e) {
      console.log(e)
      this.error = true
    }
  }
}
</script>

<style scoped>
</style>