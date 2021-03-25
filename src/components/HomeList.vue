<template>
  <div class="list">
    <router-link class="list-item" to="/">Приказы по капитальному и текущему ремонту ОУ</router-link>
    <router-link v-if="getPermission > 10" class="list-item" :to="`/documents/${getInn}`">Документация</router-link>
    <router-link v-else class="list-item" :to="'/documents'">Документация</router-link>
    <router-link class="list-item" to="/">Муниципальное задание на содержание здания</router-link>
    <router-link class="list-item" to="/">Отчеты</router-link>
    <router-link class="list-item" to="/">Ремонтные работы</router-link>
    <router-link v-if="getPermission > 10" class="list-item" :to="`/orders/${getInn}`">Наказы</router-link>
    <router-link v-else class="list-item" :to="'/orders'">Наказы</router-link>
    <router-link v-if="getPermission > 10" class="list-item" :to="`/prescriptions/${getInn}`">Предписания надзорных органов/судебные решения</router-link>
    <router-link v-else class="list-item" :to="'/prescriptions'">Предписания надзорных органов/судебные решения</router-link>
    <router-link class="list-item" to="/">Еженедельные параметры теплоносителя и внутреннего воздуха помещений</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeList',
  data: () => ({

  }),
  computed: {
    getPermission: function () {
      return localStorage.getItem('permission')
    },
    getInn: () => {
      return localStorage.getItem('inn')
    }
  },
}
</script>


<style>
.list {
  margin-top: 10px;
}

.list-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin: -1px 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  text-decoration: none;
  max-width: 250px;
  color: #555;
}
.list-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.list-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>