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
<!--        <button class="btn waves-effect waves-light" v-on:click="exportData">-->
<!--          Экспорт данных-->
<!--        </button>-->
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
                  <div class="text">Поля</div>
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
                  <div class="column inline items-baseline" v-if="isBuildInfo" >
                    <q-checkbox class="col" v-model="isTempInfo" label="Температурный режим" color="orange"/>
                    <div class="col" style="height: 250px; width: 250px" v-if="isTempInfo">
                      <q-input v-model="dateStart" filled type="date" hint="Начало периода" autofocus
                               :class="{invalid: dateStart > new Date().toISOString().substr(0,10)}"
                               :error-message="dateStart > new Date().toISOString().substr(0,10) ? 'Некорректная дата!': ''"
                               :error="(dateStart > new Date().toISOString().substr(0,10))"/>
                      <q-input v-model="dateEnd" filled type="date" hint="Конец периода" autofocus
                               :class="{invalid: dateEnd > new Date().toISOString().substr(0,10) || dateEnd < dateStart}"
                               :error-message="dateEnd > new Date().toISOString().substr(0,10) || dateEnd < dateStart ? 'Некорректная дата!': ''"
                               :error="(dateEnd > new Date().toISOString().substr(0,10) || dateEnd < dateStart)"/>
                      <q-checkbox class="col" v-model="coolant_forward_temperature" label="Температура подающего трубопровода" color="orange"/>
                      <q-checkbox class="col" v-model="coolant_backward_temperature" label="Температура обратного трубопровода" color="orange"/>
                      <q-checkbox class="col" v-model="forward_pressure" label="Давление на обратном трубопроводе" color="orange"/>
                      <q-checkbox class="col" v-model="backward_pressure" label="Давление на обратном трубопроводе" color="orange"/>
                      <q-checkbox class="col" v-model="air_temperature" label="Температурный воздуха" color="orange"/>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="q-gutter-xs row inline items-baseline">
                  <div class="text">Фильтры</div>
                  <div class="column inline items-baseline">
                    <q-checkbox class="col" v-model="isDistrictInfo" label="Районы" color="orange"/>
                    <div class="col" style="height: 250px; width: 250px" v-if="isDistrictInfo">
                      <q-checkbox class="col" color="orange"
                                  v-for="(info,key) in districtInfo"
                                  :key="key"
                                  :label="info"
                                  :value="districtStates[key]"
                                  v-model="districtStates[key]"
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
    districtInfo: {},
    mainStates: {},
    buildStates: {},
    districtStates: {},
    isMainInfo: false,
    isTempInfo: false,
    isBuildInfo: false,
    isDistrictInfo: false,
    loading: true,
    error: false,
    dialog: false,
    dateStart: '',
    dateEnd: new Date().toISOString().substr(0,10) || '',
    coolant_forward_temperature: true,
    coolant_backward_temperature: true,
    backward_pressure: true,
    forward_pressure: true,
    air_temperature: true,
    model: {}
  }),
  methods: {
    async exportData() {
      try {
        await this.$store.dispatch('exportInfo')
      } catch (e) {
        console.log(e)
      }
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
        if (this.isTempInfo) {
          data['temperature'] = {
            start: this.dateStart,
            end: this.dateEnd,
            air_temperature: this.air_temperature,
            coolant_forward_temperature: this.coolant_forward_temperature,
            coolant_backward_temperature: this.coolant_backward_temperature,
            forward_pressure: this.forward_pressure,
            backward_pressure: this.backward_pressure
          }
        }
        if (this.isDistrictInfo) {
          data['filters'] = {}
          data['filters']['district'] = this.districtStates
        }
        if (!Object.keys(data).length || (!this.isMainInfo && !this.isBuildInfo)) {
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
    if (per > 10) {
      alert("У вас недостаточно прав!")
      this.$router.push('/')
    }
  },
  async mounted() {
    try {
      if (localStorage.getItem('currentINN')) localStorage.removeItem('currentINN')
      this.districts = await this.$store.dispatch('fetchDistricts')
      this.buildInfo = await this.$store.dispatch('fetchFieldsBuilding')
      this.districtInfo = await this.$store.dispatch('fetchFieldsDistricts')
      this.mainInfo = await this.$store.dispatch('fetchFieldsSchool')
      this.districtInfo = this.districtInfo['district']
      this.districtStates = Object.assign({}, this.districtInfo)
      for (let key in this.districtStates) {
        this.districtStates[key] = true
      }
      // const test = await this.$store.dispatch('fetchAllModels')

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