<template>
  <div>
    <a-table
      :bordered="true"
      :loading="false"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="true">
      <img slot="avatarUrl" slot-scope="avatarUrl" :src="avatarUrl"/>

    </a-table>
  </div>

</template>
<script>
  import {users} from '@/services/user'

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'openid',
      dataIndex: 'openid'
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      scopedSlots: {customRender: 'avatarUrl'}
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      sorter: true
    }
  ]

  export default {
    data() {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    mounted() {
      this.initUser();
    },
    methods:{
      initUser() {
        users().then(res => {
          this.dataSource = res.result;
        })
      }
    }

  }
</script>
