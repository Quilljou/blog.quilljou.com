<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$message);
  }
}
</script>

<style lang="sass?indentedSyntax">

*
  box-sizing: border-box
  font-family: Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif


html,body, #app
  height: 100%
  background: #f8f8f8

td,
th
  text-align: center !important


.ui-router-content
  padding: 15px 25px
  background: #fff

.text-center
    text-align: center

</style>
