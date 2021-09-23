<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong> Система водоотведения поверхностных сточных вод</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="checkbox">
            <q-checkbox v-model="data.centralized_storm_sewer_system" :disable="disable" dense left-label
                        label="Наличие централизованной системы ливневой канализации на территории образовательного учреждения:"/>
          </div>

          <div class="input-field-roof-square" v-if="data.centralized_storm_sewer_system">
            <label>Количество колодцев системы ливневой канализации на территории учреждения</label>
            <q-input outlined type="number" v-model.number="data.the_number_of_wells_of_the_storm_sewer_system"
                     :disable="disable"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.storm_water_inlet" dense :disable="disable" left-label
                        label="Наличие дождеприемника на территории учреждения:"/>
          </div>
          <div class="input-field-roof-square" v-if="data.storm_water_inlet">
            <label>Количество дождеприемников на территории учреждения</label>
            <q-input outlined type="number" v-model.number="data.number_of_storm_water_inlets" :disable="disable"/>
          </div>
          <div class="checkbox">
            <q-checkbox v-model="data.water_occurs_onto_low_relief" :disable="disable" dense left-label
                        label="Слив дождевой и талой воды происходит самотеком на пониженный рельеф местности:"/>
          </div>
          <div class="square">
            <h5><strong>Площадь поверхностей</strong></h5>
            <div class="input" v-if="all_build_square">
              <label>Общая площадь территории, м2</label>
              <q-input outlined disable step="0.00001" type="number"
                       v-model.number="all_build_square"
                       hint="Данная площадь заполняется в разделе 'Здания'"
              />
            </div>
            <div class="row">
              <div class="col">
                <label>Площадь кровли, м2</label>
                <q-input outlined :disable="disable" step="0.00001" type="number" @change="sumSquare"
                         v-model.number="data.roof_square"/>
              </div>
              <div class="col">
                <label>Площадь асфальтированной территории, м2 </label>
                <q-input outlined :disable="disable" step="0.00001" type="number" @change="sumSquare"
                         v-model.number="data.paved_square"/>
              </div>
              <div class="col">
                <label>Площадь грунтовой поверхности , м2</label>
                <q-input outlined :disable="disable" step="0.00001" type="number" @change="sumSquare"
                         v-model.number="data.ground_square"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>Площадь газона, м2</label>
                <q-input outlined :disable="disable" step="0.00001" type="number" @change="sumSquare"
                         v-model.number="data.lawn_square"/>
              </div>
              <div class="col">
                <label>Площадь резинового покрытия, м2 </label>
                <q-input outlined :disable="disable" step="0.00001" type="number" @change="sumSquare"
                         v-model.number="data.rubber_square"/>
              </div>
              <div class="col">
                <label>Cуммарная площадь поверхностей, м2</label>
                <q-input outlined disable step="0.00001" type="number"
                         ref="square"
                         v-model.number="data.all_square"
                         :error="all_build_square && data.all_square > all_build_square"
                         error-message="Суммарная площадь поверхностей не соответствует общей площади участка"
                />
              </div>
            </div>
          </div>
          <button class="btn waves-effect waves" @click.prevent="disable = false" v-if="disable">
            Редактирование
          </button>
          <div class="q-gutter-sm" v-else>
            <button class="btn waves-effect waves-light" type="submit">
              Сохранить
            </button>
            <button class="btn waves-effect waves" @click.prevent="disable = true">
              Отменить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "Drainage_supply",
  data: () => ({
    disable: true,
    all_build_square: null,
    data: {
      id: null,
      centralized_storm_sewer_system: null,
      storm_water_inlet: null,
      water_occurs_onto_low_relief: null,
      number_of_storm_water_inlets: null,
      the_number_of_wells_of_the_storm_sewer_system: null,
      roof_square: null,
      paved_square: null,
      ground_square: null,
      lawn_square: null,
      rubber_square: null,
      all_square: null,
    },
    loading: true,
  }),
  computed: {},
  methods: {
    sumSquare() {
      this.data.all_square = this.data.roof_square + this.data.paved_square + this.data.ground_square + this.data.lawn_square + this.data.rubber_square
    },
    async save() {
      if (this.$refs.square.hasError) this.showMessage('error')
      else {
        try {
          this.data.number_of_storm_water_inlets = Number(this.data.number_of_storm_water_inlets);
          this.data.the_number_of_wells_of_the_storm_sewer_system = Number(this.data.the_number_of_wells_of_the_storm_sewer_system);
          const resp = await this.$store.dispatch('sendEngineeringInfoJSON', this.data)
          if (resp['status'] === 200) {
            this.showMessage('saveSuccess')
            this.disable = true
          }
        } catch (e) {
          console.log(e)
          this.showMessage('error')
        }
      }
    },
    showMessage(text) {
      if (messages[text]) {
        window.scrollTo(0, 0)
        this.$message(messages[text])
      }
    }
  },
  async mounted() {
    this.loading = true
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const resp = await this.$store.dispatch('fetchBuilding', {token, id})
      this.all_build_square = resp.land_square
      const info = await this.$store.dispatch('fetchEngineering', {token, id})
      console.log(info)
      const tmp = Object.keys(this.data)
      for (let item in info) {
        if (tmp.includes(item)) {
          if (info[item] === '/media/null' || info[item] === 'null') {
            info[item] = null
          }
          this.data[item] = info[item]
        }
      }
      this.data['id'] = id
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>