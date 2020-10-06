<template>
  <footer class="footer">
          <div class="text"><p>Департамент образования мэрии города Новосибирска<br>
            <strong>630099, город Новосибирск, ул.Красный проспект,  34 Тел.: 227-45-00</strong></p></div>
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
  display: flex;
  padding-top: 4rem;
  min-height: 131px;
  left: 0;
  right: 0;
  bottom: 0;
}

.text{
  width: auto;
  color: white;
  font-size: large;
  margin-left: 20%;
}

</style>