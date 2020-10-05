<template>
  <div>
    <Header/>
    <h2>District {{district}}</h2>
    <SchoolList v-bind:schools="schools"/>
  </div>
</template>

<script>
import SchoolList from "@/components/SchoolList";
import {server_path} from "@/local_settings";
import $ from "jquery";
import Header from "@/components/Header";
export default {
name: "OneDistrict",
  components: {Header, SchoolList},
  data() {
    return {
      schools: []
    }
  },
  mounted() {
    $.ajax({
      url: server_path +'api/districts/'+this.district,
      type: "GET",
      headers: { "Authorization": "Token " + sessionStorage.getItem("auth_token") },
      dataType: 'json',
      data:{
        username: this.username,
      },
      success: (response) => {
        this.schools = response.data
        console.log(this.districts)
      },
      error: (response) => {
        alert("Что-то пошло не так")
        console.log(response)
      }
    })
  },
  props: ['district']
}
</script>

<style scoped>

</style>