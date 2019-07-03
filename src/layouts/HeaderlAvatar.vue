<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.name}}</span>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a @click="clickLoginout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'HeaderAvatar',
  computed: {
    currUser () {
      return this.$store.state.account.user;
    }
  },
  methods: {
    ...mapActions('account', ['loginout']),
    async clickLoginout () {
      let error = await this.loginout();
      if (error) {
        this.$message.error(error);
        return;
      }
      this.$message.success('登出成功！');
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
