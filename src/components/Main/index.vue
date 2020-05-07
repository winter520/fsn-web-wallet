<template>
  <div class="boxConntent1">
    <header class="header-box">

    </header>
    <section>
      <router-view></router-view>
    </section>
    <footer>

    </footer>
  </div>
</template>

<style lang="scss">
$HeaderH: 50;
.header-box {
  width: 100%;
}
</style>

<script>
export default {
  name: 'mainPage',
  data () {
    return {

    }
  }
}
</script>