<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created()
  {
      Bus.$on("login", ()=>{
        this.$router.push("/login");
      })
  }
}
</script>

<style lang="less">
body {
  background-color: #fbf9fe;
  width: 100%;
  height: 100%;
  font-size: 16px;
}

#app{
  width: 100%;
  height: 100%;
}
</style>