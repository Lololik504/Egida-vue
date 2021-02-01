<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else>
      <h5 class="center">Спортивные сооружения, теневые навесы</h5>
      <form @submit.prevent="save">
        <div class="q-pa-md">
          <div class="select-type-field">
            <label>Наличие спортивных площадок</label>
            <div class="select">
              <q-select outlined v-model="hasSport" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div v-if="hasSport === 'Есть'">
            <label>Количество спортивных площадок, шт</label>
            <q-input outlined type="number" v-model.number="countSport"/>
          </div>
          <q-card flat bordered class="my-card" v-if="hasSport === 'Есть'">
            <label>Техническое состояние спортивных площадок:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusSport" val="Работоспособное состояние"/>
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
                <q-item v-if="statusSport === 'Работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentSport"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusSport" val="Ограниченно работоспособное состояние"/>
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
                <q-item v-if="statusSport === 'Ограниченно работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentSport"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusSport" val="Аварийное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="statusSport === 'Аварийное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentSport"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
          <div class="select-type-field">
            <label>Наличие хоккейной коробки</label>
            <div class="select">
              <q-select outlined v-model="hasHockey" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div v-if="hasHockey === 'Есть'">
            <label>Количество коробок, шт</label>
            <q-input outlined type="number" v-model.number="countHockey"/>
          </div>
          <q-card flat bordered class="my-card" v-if="hasHockey === 'Есть'">
            <label>Техническое состояние хоккейной коробки:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusHockey" val="Работоспособное состояние"/>
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
                <q-item v-if="statusHockey === 'Работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentHockey"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusHockey" val="Ограниченно работоспособное состояние"/>
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
                <q-item v-if="statusHockey === 'Ограниченно работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentHockey"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusHockey" val="Аварийное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="statusHockey === 'Аварийное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentHockey"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <br/>
          <div class="select-type-field">
            <label>Наличие теневых навесов</label>
            <div class="select">
              <q-select outlined v-model="hasNaves" :options="['Есть', 'Нет']"/>
            </div>
          </div>
          <div v-if="hasNaves === 'Есть'">
            <label>Количество навесов, шт</label>
            <q-input outlined type="number" v-model.number="countNaves"/>
          </div>
          <q-card flat bordered class="my-card" v-if="hasNaves === 'Есть'">
            <label>Техническое состояние теневых навесов:</label>
            <div class="q-pa-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusNaves" val="Работоспособное состояние"/>
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
                <q-item v-if="statusNaves === 'Работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentNaves"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusNaves" val="Ограниченно работоспособное состояние"/>
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
                <q-item v-if="statusNaves === 'Ограниченно работоспособное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentNaves"/>
                  </div>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="statusNaves" val="Аварийное состояние"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Аварийное состояние</q-item-label>
                    <q-item-label caption>категория технического состояния строительной конструкции или здания и
                      сооружения в целом, характеризующаяся повреждениями и деформациями, свидетельствующими об
                      исчерпании несущей способности и опасности обрушения.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="statusNaves === 'Аварийное состояние'" >
                  <div class="input-field-roof-square">
                    <label>Количество, шт</label>
                    <q-input outlined type="number" v-model="percentNaves"/>
                  </div>
                </q-item>
              </q-list>
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
  name: "Sport_facility",
  data: () => ({
    loading: false,
    percentNaves: null,
    percentSport: null,
    percentHockey: null,
    countHockey: null,
    countNaves: null,
    countSport: null,
    hasSport: null,
    hasNaves: null,
    hasHockey: null,
    statusHockey: null,
    statusSport: null,
    statusNaves: null
  }),
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save() {
      console.log(this.window_status)
    }
  }
}
</script>

<style scoped>
.select {
  margin-bottom: 1px;
}
</style>