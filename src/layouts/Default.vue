<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <router-link to="/home">123</router-link>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
