<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Спортивные сооружения, теневые навесы</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div>
            <label>Количество спортивных площадок, шт</label>
            <q-input outlined type="number" :disable="disable" v-model.number="data.sport_ground_count"/>
          </div>
          <q-card flat bordered class="my-card" v-if="data.sport_ground_count">
            <label>Техническое состояние спортивных площадок:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортивных площадок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.sport_ground_ok_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортивных площадок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.sport_ground_warning_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество спортивных площадок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.sport_ground_emergency_count"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
          <div>
            <label>Количество коробок, шт</label>
            <q-input outlined type="number" :disable="disable" v-model.number="data.hockey_rink_count"/>
          </div>
          <q-card flat bordered class="my-card" v-if="data.hockey_rink_count">
            <label>Техническое состояние хоккейной коробки:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество хоккейных коробок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.hockey_rink_ok_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество хоккейных коробок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.hockey_rink_warning_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество хоккейных коробок</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.hockey_rink_emergency_count"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
          <div>
            <label>Количество навесов, шт</label>
            <q-input outlined type="number" :disable="disable" v-model.number="data.shade_canopy_count"/>
          </div>
          <q-card flat bordered class="my-card" v-if="data.shade_canopy_count">
            <label>Техническое состояние теневых навесов:</label>
            <div class="q-pa-sm">
              <q-list>
                <q-item class="column">
                  <h6 class="col">Работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество теневых навесов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.shade_canopy_ok_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Ограниченно работоспособное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество теневых навесов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.shade_canopy_warning_count"/>
                  </div>
                </q-item>
                <q-item class="column">
                  <h6 class="col">Аварийное состояние</h6>
                  <div class="input-field-roof-square col">
                    <label>Количество теневых навесов</label>
                    <q-input outlined type="number" :disable="disable" v-model="data.shade_canopy_emergency_count"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
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

export default {
  name: "Sport_facility",
  data: () => ({
    loading: true,
    disable: true,
    data: {
      sport_ground_ok_count: null,
      sport_ground_warning_count: null,
      sport_ground_emergency_count: null,
      hockey_rink_count: null,
      shade_canopy_count: null,
      sport_ground_count: null,
      shade_canopy_emergency_count: null,
      shade_canopy_warning_count: null,
      shade_canopy_ok_count: null,
      hockey_rink_emergency_count: null,
      hockey_rink_warning_count: null,
      hockey_rink_ok_count: null,
      id: null
    }
  }),
  methods: {
    async save() {
      try {
        const resp = await this.$store.dispatch('sendSportInfo', this.data)
        if (resp['status'] === 200) {
          this.$showMessage('saveSuccess')
          this.disable = true
        }
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchSport', {token, id})
      Object.assign(this.data, info)
      this.data['id'] = id
      this.loading = false
    } catch (e) {
      console.log(e)
      this.$showMessage('error')
    }
  }
}
</script>

<style scoped>
.my-card {
  border-width: 2px;
  border-color: #999999;
  padding-left: 10px;
}
</style>