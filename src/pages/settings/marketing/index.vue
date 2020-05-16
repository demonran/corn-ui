<template>
  <div>
    <div style="padding: 0 24px">
      <a-tabs tab-position="left"  @change="navigate" :activeKey="activeKey">
        <a-tab-pane tab="拉新设置" key="1">
          <router-view/>
        </a-tab-pane>
        <a-tab-pane tab="提现申请" key="2">
          <router-view/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    computed: {
      activeKey() {
        switch (this.$route.path) {
          case '/settings/marketing/newer-coupon':
            return '1';
          case '/settings/marketing/withdraw':
            return '2';
          default:
            return '1';
        }
      }
    },
    methods: {
      navigate(key) {
        switch (key) {
          case '1':
            this.$router.push('/settings/marketing/newer-coupon');
            break;
          case '2':
            this.$router.push('/settings/marketing/withdraw');
            break;
          default:
            this.$router.push('/workplace');
        }
      }
    }
  }
</script>

<style scoped>

</style>
