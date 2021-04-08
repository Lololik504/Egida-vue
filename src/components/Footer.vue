<template>
  <footer class="footer">
          <div class="text"><p>Департамент образования мэрии города Новосибирска<br>
            <strong>630099, город Новосибирск, ул.Красный проспект,  34</strong></p></div>
<!--    <strong>Тел.: 227-45-00</strong>-->
  </footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>


footer {
  background-image: url(~@/assets/footer.png);
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  padding-top: 4rem;
  justify-content: center;
  min-height: 131px;
}

.text{
  margin: 0 auto;
  width: auto;
  color: white;
  font-size: large;
}

</style>