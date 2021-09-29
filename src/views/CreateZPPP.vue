<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h4>Добавление ЗППП</h4>
      <form @submit.prevent="submitHandler">
        <div class="q-pa-sm">
          <div class="input-field-other">
            <label>Адрес места нахождения ЗППП</label>
            <q-input outlined hint="Формат: индекс, город, улица, номер дома" v-model="data.zppp_adress"/>
          </div>
          <div class="input-field-other">
            <label>Тип здания</label>
            <q-input outlined v-model="data.zppp_type"/>
          </div>
          <div class="select-type-field">
            <label>Форма собственности</label>
            <div class="select">
              <q-select outlined v-model="data.type_ownership"
                        :options="['Ф', 'С', 'М', 'Ч']"/>
            </div>
          </div>
          <div class="select-type-field">
            <label>Группа ЗППП</label>
            <div class="select">
              <q-select outlined v-model="data.zppp_group"
                        :options="[0, 1]"/>
            </div>
          </div>
          <div class="input-field-height">
            <label>Высота ЗППП, м</label>
            <q-input outlined type="number" step="0.001" v-model.number="data.zppp_height"/>
          </div>
          <div class="input-field-square">
            <label>Общая плошадь ЗППП, кв. м</label>
            <q-input outlined type="number" step="0.001" v-model.number="data.zppp_square"/>
          </div>
          <div class="select-type-field">
            <label>Материал наружных стен ЗППП</label>
            <q-select outlined v-model="data.zppp_material" :options="materials"/>
          </div>
          <div class="input-field-other" v-if="data.zppp_material === materials[4]">
            <label>Введите материал наружных стен ЗППП</label>
            <q-input outlined v-model="other_material"/>
          </div>
          <div class="select-type-field">
            <label>Наличие отопления ЗППП</label>
            <div class="select">
              <q-select outlined
                        emit-value
                        map-options
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
                        v-model="data.zppp_ventilation"
                        :options="[{label: 'Есть', value: true}, {label: 'Нет', value: false}]"/>
            </div>
          </div>
          <div class="input-field-info">
            <label>Дополнительные сведения</label>
            <q-input outlined v-model="data.zppp_additional"/>
          </div>
        </div>
        <div class="q-gutter-md">
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <button class="btn waves-effect waves-light" @click="returnBack">
            Вернуться назад
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateZPPP",
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
    async submitHandler() {
      try {
        const inn = this.$route.params['id']
        if (this.other_material) this.data.zppp_material = this.other_material
        await this.$store.dispatch('createZPPP', {file: this.data, inn: inn})
        this.$showMessage('saveSuccess')
        await this.$router.push(`/civil_defense/${this.$route.params['id']}`)
      } catch (e) {
        this.$showMessage('error')
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>