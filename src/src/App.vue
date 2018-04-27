<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    $("#progressbar").remove();
  }
}
</script>

<style>
#app {

}
</style>
