<template>
  <div>
    <crud-operation/>
    <a-modal
      :title="crud.status.title"
      :visible="crud.status.cu > 0"
      :confirm-loading="crud.status.cu == 2"
      @cancel="crud.cancelCU"
      @ok="crud.submitCU"
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
          <a-switch @change="change" v-model="form.status === 'OPENED'"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-table :columns="columns" rowKey="id" :data-source="crud.data">
     <span slot="status" slot-scope="status">
       <a-tag v-if="status === 'OPENED'" color="green">启用中</a-tag>
       <a-tag v-if="status !=='OPENED'" color="red">停用</a-tag>
     </span>
      <span slot="action" slot-scope="text, record">
        <ud-operation :data="record"></ud-operation>
    </span>
    </a-table>
  </div>
</template>

<script>

  const columns = [

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
      dataIndex: 'receivedCount',
      key: 'receivedCount',
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
  const defaultForm = {amount: '', commission: '', minUsed: '', expiryDate: '', rule: '', status: 'OPENED'}
  import newerCoupon from '@/services/newer-coupon';
  import CRUD, {presenter, form, crud} from '@/components/Crud/curd'
  import udOperation from "@/components/Crud/udOperation";
  import crudOperation from "@/components/Crud/crudOperation";

  export default {
    name: "newer-coupon",
    cruds() {
      return CRUD({crudMethod: {...newerCoupon}})
    },
    mixins: [presenter(), form(defaultForm), crud()],
    components: {
      udOperation,
      crudOperation
    },
    data() {
      return {
        columns,
        confirmLoading: false,
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
      change(val) {
        if (val) {
          this.form.status = 'OPENED'
        } else {
          this.form.status = 'CLOSED'
        }
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
