<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">
        <strong>Административные кабинеты</strong>
      </h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="input-field-roof-square">
            <label>Общее количество</label>
            <q-input outlined type="number" v-model="count"/>
          </div>
          <q-card flat bordered class="my-card">
            <label>Техническое состояние административных кабинетов:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status" val="Работоспособное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Работоспособное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния здания, при которой некоторые из численно
                      оцениваемых контролируемых параметров не отвечают требованиям проекта, норм и стандартов, но
                      имеющиеся нарушения требований, например, по деформативности, а в железобетоне и по
                      трещиностойкости, в данных конкретных условиях эксплуатации не приводят к нарушению
                      работоспособности, и несущая способность конструкций, с учетом влияния имеющихся дефектов и
                      повреждений, обеспечивается.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status" val="Ограниченно работоспособное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ограниченно работоспособное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния здания или его строительных конструкций,
                      при которой имеются дефекты и повреждения, приведшие к некоторому снижению несущей
                      способности,
                      но отсутствует опасность внезапного разрушения и функционирование конструкции возможно при
                      контроле ее состояния, продолжительности и условий эксплуатации.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="status === 'Ограниченно работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество помещений</label>
                    <q-input outlined type="number" v-model="countRooms"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="status" val="Аварийное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="status === 'Аварийное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество помещений</label>
                    <q-input outlined type="number" v-model="countRooms"/>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div class="input-roof-photo">
              <label>Акт обследования технического состояния (экспертной оценки специализированной организации)</label>
              <q-file
                  v-model="act"
                  outlined
                  hint="Выберите файл с расширением jpg, jpeg, pdf размером не более 3МБ"
                  multiple
                  max-total-size="25165824"
                  accept=".jpg, image/jpeg, .pdf"
                  @rejected="onRejected"
              />
            </div>
          </q-card>
          <br/>
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Administrative",
  data: () => ({
    act: null,
    status: null,
    count: null,
    countRooms: null,
    loading: false,
  }),
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      console.log(this.status)
    }
  }
}
</script>

<style scoped>

</style>