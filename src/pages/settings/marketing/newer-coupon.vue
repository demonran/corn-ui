<template>
  <div>
    <div class="crud-opts">
      <span class="crud-opts-left">
        <a-button icon="plus" type="primary" @click="visible = true">新增</a-button>
      </span>
    </div>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="cancel"
      @ok="submitCU"
    >
      <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
        <a-form-model-item label="优惠券金额" prop="amount">
          <a-input prefix="¥" v-model="form.amount"/>
        </a-form-model-item>
        <a-form-model-item label="奖励现金" prop="commission">
          <a-input prefix="¥" v-model="form.commission"/>
        </a-form-model-item>
        <a-form-model-item label="起用金额">
          <a-input prefix="¥" v-model="form.minUsed"/>
        </a-form-model-item>
        <a-form-model-item label="有效期">
          <a-input v-model="form.expiryDate"/>
        </a-form-model-item>
        <a-form-model-item label="使用规则">
          <a-input type="textarea" v-model="form.rule"/>
        </a-form-model-item>

        <a-form-model-item label="是否启用">
          <a-switch v-model="form.enable"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-table :columns="columns" :data-source="datasource">
     <span slot="status" slot-scope="status">
       <a-tag v-if="status === 'OPENED'" color="green">启用中</a-tag>
       <a-tag v-if="status !=='OPENED'" color="red">停用</a-tag>
     </span>
      <span slot="action" slot-scope="text, record">
        <a-button size="small" type="primary" icon="edit" @click="toEdit(record)"/>
            <a-popconfirm title="是否要删除此行？" @confirm="doDelete(record)">
              <a-button size="small" type="danger" icon="delete"></a-button>
            </a-popconfirm>
    </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      slots: {title: 'customTitle'},
      scopedSlots: {customRender: 'name'},
    },
    {
      title: '优惠金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '奖励金额',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: '起用金额',
      dataIndex: 'minUsed',
      key: 'minUsed',
    },
    {
      title: '有效期',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: '领取人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: {customRender: 'status'},
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: {customRender: 'action'},
    },
  ];

  import newerCoupon from '@/services/newer-coupon';
  import CRUD, {crud} from '@/components/Crud/curd'

  export default {
    name: "newer-coupon",
    mixins: [crud({crudMethod: {list: newerCoupon.list,edit: newerCoupon.edit, add: newerCoupon.add, del: newerCoupon.del}})],
    data() {
      return {
        columns,
        datasource: [],
        form: {enable: true},
        confirmLoading: false,
        visible: false,
        rules: {
          amount: [
            {required: true, message: '请输入优惠券金额', trigger: 'change'},
          ],
          commission: [
            {required: true, message: '请输入反佣金额', trigger: 'change'},
          ],
        }
      }
    },


    methods: {
      cancel() {
        this.visible = false;
      },
      beforeToEdit(form) {
        form.status = form.enable ? 'OPENED' : "CLOSED";
      }
    }
  }
</script>

<style scoped>
  .crud-opts {
    padding: 4px 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }

  .crud-opts .crud-opts-right {
    margin-left: auto;
  }
</style>
