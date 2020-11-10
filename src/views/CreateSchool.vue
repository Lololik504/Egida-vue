<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5>Добавить учреждение</h5>
      <div class="q-pa-md">
        <div class="input-field-inn">
          <label>ИНН учреждения</label>
          <q-input outlined placeholder="Введите ИНН" v-model.number="$v.INN.$model"
                   :class="{invalid: (!$v.INN.required && $v.INN.$dirty) || ($v.INN.$dirty && !$v.INN.minLength) || ($v.INN.$dirty && !$v.INN.maxLength)}"
                   type="number"
                   :error-message="!$v.INN.required && $v.INN.$dirty ? 'Поле не должно быть пустым'
                 : $v.INN.$dirty && !$v.INN.minLength ? `ИНН должен быть не менее ${$v.INN.$params.minLength.min} цифр! Cейчас длина равна ${String(INN).length}`
                 : $v.INN.$dirty && !$v.INN.maxLength ? `ИНН должен быть не более ${$v.INN.$params.maxLength.max} цифр! Cейчас длина равна ${String(INN).length}`
                 : ''"
                   :error="(!$v.INN.required && $v.INN.$dirty) || ($v.INN.$dirty && !$v.INN.minLength) || ($v.INN.$dirty && !$v.INN.maxLength)"

          />
        </div>
        <div class="input-field-shortname">
          <label>Краткое наименование</label>
          <q-input outlined placeholder="Введите краткое наименование" v-model="$v.shortname.$model"
                   :class="{invalid: (!$v.shortname.required && $v.shortname.$dirty)}"
                   :error-message="!$v.shortname.required && $v.shortname.$dirty ? 'Поле не должно быть пустым': ''"
                   :error="(!$v.shortname.required && $v.shortname.$dirty)"

          />
        </div>
        <div class="select-district">
          <label>Район</label>
          <q-select outlined hint="Выберите район" v-model="$v.district.$model" :options="districts"
                    :class="{invalid: (!$v.district.required && $v.district.$dirty)}"
                    :error-message="!$v.district.required && $v.district.$dirty ? 'Поле не должно быть пустым': ''"
                    :error="(!$v.district.required && $v.district.$dirty)"
          />
        </div>
        <button class="btn waves-effect waves-light" @click.prevent="clickHandler">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "CreateSchool",
  data: () => ({
    loading: true,
    INN: null,
    shortname: null,
    district: null,
    districts: []
  }),
  validations: {
    INN: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(12)
    },
    shortname: {
      required
    },
    district: {
      required
    }
  },
  async mounted() {
    try {
      const resp = await this.$store.dispatch('fetchDistricts')
      for (let key in resp) {
        this.districts.push(resp[key].name.name)
      }
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async clickHandler() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const dataForm = {
          INN: this.INN,
          shortname: this.shortname,
          district: this.district
        }
        console.log(dataForm)
        if (dataForm.district && dataForm.shortname && dataForm.INN) {
          await this.$store.dispatch('createSchool', dataForm)
          await this.$router.push('/districts')
        } else {
          alert('Введите все поля!')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>