<template>
  <div>
  <HomeList/>
  </div>
</template>

<script>
import HomeList from '@/components/HomeList'
export default {
  name: "Home",
  components: {HomeList}
}
</script>

<style scoped>

.rounded a {
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  margin: .5em 0;
  background: #DAD2CA;
  color: #444;
  text-decoration: none;
  border-radius: .3em;
  transition: .3s ease-out;
}

.rounded a:hover {
  background: #E9E4E0;
}

.rounded a:hover:before {
  transform: rotate(360deg);
}

.rounded a:before {
  content: counter(rr);
  counter-increment: rr;
  position: absolute;
  left: -1.3em;
  top: 0%;
  /*margin-top: 1.3em;*/
  background: #8FD4C1;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: .3em solid white;
  text-align: center;
  font-weight: bold;
  border-radius: 2em;
  transition: all .3s ease-out;
}



ul{
  align-self: flex-start;
}

</style>