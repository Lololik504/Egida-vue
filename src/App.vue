<template>
  <div id="app" class="wrapper">
    <Header class="header"/>
    <router-view class="content"/>
    <Footer class="footer"/>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {Footer, Header}
}
</script>


<style>
{
  margin: 0
;
  padding: 0
;
}

html,
body {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;

  min-height: 100%;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}

</style>