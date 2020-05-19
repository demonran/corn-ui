<template>
  <div class="footer">
    <div class="copyright">
      Copyright<a-icon type="copyright" />{{copyright}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  props: ['copyright', 'linkList']
};
</script>

<style lang="less" scoped>
  .footer{
    background: none repeat scroll 0 0 white;
    overflow: hidden;
    border-top: 1px solid #e7eaec;
    padding: 0 16px;
    letter-spacing: 0.8px;
    height: 38px;
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    .copyright{
      color: rgba(0,0,0,.45);
      font-size: 14px;
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: rgba(0,0,0,.45);
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
