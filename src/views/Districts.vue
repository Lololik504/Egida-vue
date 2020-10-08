<template>
  <div>
    <DistrictList v-bind:districts="districts"/>
  </div>
</template>

<script>
import DistrictList from "@/components/DistrictList";
import $ from "jquery";
import {server_path} from "@/local_settings";

export default {
  components: {DistrictList},
  data: () => {
    let user_name
    if (sessionStorage.getItem('username')) {
      user_name = sessionStorage.getItem('username')
    }
    return {
      districts: [],
      username: user_name
    }
  },
  mounted() {
    $.ajax({
      url: server_path + "api/districts/",
      type: "GET",
      headers: {
        "Authorization": "Token " + sessionStorage.getItem("auth_token"),
        "Username": this.username
      },
      dataType: 'json',
      data: {
        username: this.username,
      },
      success: (response) => {
        this.districts = response.data
        console.log(this.districts)
      },
      error: (response) => {
        alert("У вас нет доступа!")
        this.$router.push({name: "home"})
        console.log(response)
      }
    })
  },
  name: "Districts"
}
</script>

<style scoped>

</style>