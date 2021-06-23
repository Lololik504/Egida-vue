<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Доступная среда</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Паспорт доступности:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="data.accessibility_passport_agreed" :disable="disable" dense left-label
                          label="Согласован:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.accessibility_passport_published_on_site" :disable="disable" dense left-label
                          label="Опубликован на сайте образовательного учреждения:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Уличная территория:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="data.markings_and_parking_for_disabled_people" :disable="disable" dense left-label
                          label="Наличие разметки и знака парковки для инвалидов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.street_tactile_tiles" :disable="disable" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.asphalted_area_with_slopes" :disable="disable" dense left-label
                          label="Наличие асфальтируемой территории с низким бордюрам и спуском:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.street_tactile_mnemonic_diagrams" :disable="disable" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.street_sound_beacons" :disable="disable" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.playgrounds_for_children_with_disabilities" :disable="disable" dense left-label
                          label="Наличие игровых площадок для детей с ограниченными возможностями:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.induction_system_for_hearing_impaired" :disable="disable" dense left-label
                          label="Наличие индукционных систем для слабослышащих:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Вход в здание:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_tactile_mnemonic_diagrams" :disable="disable" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_sound_beacons" :disable="disable" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_automatic_door_opening" :disable="disable" dense left-label
                          label="Наличие функции автоматического открывания дверей:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_anti_slip_coating" :disable="disable" dense left-label
                          label="Наличие противоскользящего покрытия:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_lifts" :disable="disable" dense left-label
                          label="Наличие подъемников и лифтов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_ramps" :disable="disable" dense left-label
                          label="Наличие пандусов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_handrails_and_railings" :disable="disable" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_contrast_tape_on_the_steps" :disable="disable" dense
                          left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_tactile_tiles" :disable="disable" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.building_entrance_tactile_information_stand" :disable="disable" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Движение по этажам:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_tactile_mnemonic_diagrams" :disable="disable" dense left-label
                          label="Наличие тактильных мнемосхем:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_sound_beacons" :disable="disable" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_automatic_door_opening" :disable="disable" dense left-label
                          label="Наличие функции автоматического открывания дверей:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_anti_slip_coating" :disable="disable" dense left-label
                          label="Наличие противоскользящего покрытия:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_lifts" :disable="disable" dense left-label
                          label="Наличие подъемников и лифтов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_ramps" :disable="disable" dense left-label
                          label="Наличие пандусов:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_handrails_and_railings" :disable="disable" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_contrast_tape_on_the_steps" :disable="disable" dense left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_tactile_tiles" :disable="disable" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.floors_movement_tactile_information_stand" :disable="disable" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
            </div>
          </q-card>
          <br/>
          <q-card bordered flat class="q-pa-sm">
            <h6>
              <strong>Санузлы:</strong>
            </h6>
            <div class="checkbox col">
              <q-checkbox v-model="data.bathroom_sound_beacons" :disable="disable" dense left-label
                          label="Наличие звуковых маяков (кнопка вызова):"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.bathroom_handrails_and_railings" :disable="disable" dense left-label
                          label="Наличие поручней и перил:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.bathroom_contrast_tape_on_the_steps" :disable="disable" dense left-label
                          label="Наличие контрастной ленты на ступенях:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.bathroom_tactile_tiles" :disable="disable" dense left-label
                          label="Наличие тактильной плитки:"/>
            </div>
            <div class="checkbox col">
              <q-checkbox v-model="data.bathroom_tactile_information_stand" :disable="disable" dense left-label
                          label="Наличие тактильного информационного стенда:"/>
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
  name: "Accessible_environment",
  data: () => ({
    loading: false,
    disable: true,
    data: {
      accessibility_passport_agreed: null,
      accessibility_passport_published_on_site: null,
      bathroom_sound_beacons: null,
      bathroom_handrails_and_railings: null,
      bathroom_contrast_tape_on_the_steps: null,
      bathroom_tactile_tiles: null,
      bathroom_tactile_information_stand: null,
      building_entrance_tactile_mnemonic_diagrams: null,
      building_entrance_sound_beacons: null,
      building_entrance_automatic_door_opening: null,
      building_entrance_anti_slip_coating: null,
      building_entrance_lifts: null,
      building_entrance_ramps: null,
      building_entrance_handrails_and_railings: null,
      building_entrance_contrast_tape_on_the_steps: null,
      building_entrance_tactile_tiles: null,
      building_entrance_tactile_information_stand: null,
      floors_movement_tactile_mnemonic_diagrams: null,
      floors_movement_sound_beacons: null,
      floors_movement_automatic_door_opening: null,
      floors_movement_anti_slip_coating: null,
      floors_movement_lifts: null,
      floors_movement_ramps: null,
      floors_movement_handrails_and_railings: null,
      floors_movement_contrast_tape_on_the_steps: null,
      floors_movement_tactile_tiles: null,
      floors_movement_tactile_information_stand: null,
      markings_and_parking_for_disabled_people: null,
      street_tactile_tiles: null,
      asphalted_area_with_slopes: null,
      street_tactile_mnemonic_diagrams: null,
      street_sound_beacons: null,
      playgrounds_for_children_with_disabilities: null,
      induction_system_for_hearing_impaired: null,
      id: null
    }
  }),
  methods: {
    async save() {
      try {
        const resp = await this.$store.dispatch('sendEnvironmentInfo', this.data)
        if (resp['status'] === 200) {
          this.$showMessage('saveSuccess')
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
      const info = await this.$store.dispatch('fetchEnvironment', {token, id})
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
</style>