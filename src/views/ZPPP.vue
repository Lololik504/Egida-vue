<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Защитное сооружение</h4>
      <form @submit.prevent="submitHandler">
        <div class="q-pa-sm">
          <div class="input-field-other">
            <label>Адрес места нахождения ЗППП</label>
            <q-input :disable="disable" outlined v-model="data.zppp_adress"/>
          </div>
          <div class="input-field-other">
            <label>Тип здания</label>
            <q-input :disable="disable" outlined v-model="data.zppp_type"/>
          </div>
          <div class="select-type-field">
            <label>Форма собственности</label>
            <div class="select">
              <q-select outlined v-model="data.type_ownership"
                        :disable="disable"
                        :options="['Ф', 'С', 'М', 'Ч']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Группа ЗППП</label>
            <div class="select">
              <q-select outlined v-model="data.zppp_group"
                        :disable="disable"
                        :options="[1, 2, 3, 4, 5]"/>
            </div>
          </div>
          <div class="input-field-height">
            <label>Высота ЗППП, м</label>
            <q-input :disable="disable" outlined type="number" step="0.001" v-model.number="data.zppp_height"/>
          </div>
          <div class="input-field-square">
            <label>Общая плошадь ЗППП, кв. м</label>
            <q-input :disable="disable" outlined type="number" step="0.001" v-model.number="data.zppp_square"/>
          </div>
          <div class="select-type-field">
            <label>Материал наружных стен ЗППП</label>
            <q-select :disable="disable" outlined v-model="data.zppp_material" :options="materials"/>
          </div>
          <div class="input-field-other" v-if="data.zppp_material === materials[4]">
            <label>Введите материал наружных стен ЗППП</label>
            <q-input :disable="disable" outlined v-model="other_material"/>
          </div>
          <div class="select-type-field">
            <label>Наличие отопления ЗППП</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.zppp_heating"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие водоразборных кранов холодного и горячего водоснабжения в ЗППП</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.zppp_water"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие канализации в ЗППП</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.zppp_sewerage"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие освещения</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.zppp_light"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Наличие принудительной вентиляции в ЗППП</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
                        :disable="disable"
                        v-model="data.zppp_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-info">
            <label>Дополнительные сведения</label>
            <q-input :disable="disable" outlined v-model="data.zppp_additional"/>
          </div>
        </div>
        <div class="q-gutter-sm" v-if="disable">
          <button class="btn waves-effect waves" @click.prevent="disable = false">
            Редактирование
          </button>
          <button class="btn waves-effect waves-light" @click.prevent="deleteZPPP">
            Удалить
          </button>
        </div>
        <div class="q-gutter-sm" v-else>
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <button class="btn waves-effect waves" @click.prevent="cancel">
            Отменить
          </button>
        </div>
        <br/>
        <button class="btn waves-effect waves-light" @click="returnBack">
          Вернуться назад
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZPPP",
  data: () => ({
    materials: [
      'Из облицовочного кирпича',
      'Оштукатуренный и окрашенный (с утеплением или без утепления)',
      'Навесной вентилируемый (с утеплением или без утепления) с облицовкой (керамогранит, металлический или пластиковый сайдинг, фиброцементные панели или др.)',
      'Сборные газобетонные (керамзитобетонные) панели',
      'Прочее'
    ],
    disable: true,
    loading: false,
    other_material: null,
    id: null,
    inn: null,
    data: {
      zppp_additional: null,
      zppp_type: null,
      zppp_adress: null,
      type_ownership: null,
      zppp_group: null,
      zppp_height: null,
      zppp_square: null,
      zppp_material: null,
      zppp_heating: null,
      zppp_water: null,
      zppp_sewerage: null,
      zppp_light: null,
      zppp_ventilation: null,
    }
  }),
  methods: {
    async returnBack() {
      await this.$router.go(-1)
    },
    async cancel() {
      this.disable = true
      await this.loadingPage()
    },
    async submitHandler() {
      try {
        if (this.other_material) this.data.zppp_material = this.other_material
        await this.$store.dispatch('updateZPPP', {file: this.data, inn: this.inn, id: this.id})
        this.$showMessage('saveSuccess')
        await this.$router.go(-1)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteZPPP() {
      try {
        await this.$store.dispatch('deleteZPPP', {inn: this.inn, id: this.id})
        this.$showMessage('deleteSuccess')
        await this.$router.go(-1)
      } catch (e) {
        console.log(e)
        this.$showMessage('error')
      }
    },
  },
  async mounted() {
    this.loading = true
    this.inn = this.$route.params['inn']
    this.id = this.$route.params['id']
    try {
      const info = await this.$store.dispatch('fetchZPPPById', {inn: this.inn, id: this.id})
      this.data = info['zppp']
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>