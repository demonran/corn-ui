<template>
  <a-modal title="建档" :visible="visible" :footer="null" :closable="false" >
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="学生姓名">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="性别">
        <a-select v-model="form.gender">
          <a-select-option value="男">
            男
          </a-select-option>
          <a-select-option value="女">
            女
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="出生年月">
        <a-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="年级">
        <a-input v-model="form.grade" />
      </a-form-model-item>
      <a-form-model-item label="学校">
        <a-input v-model="form.school" />
      </a-form-model-item>
      <a-form-model-item label="电话">
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="家长姓名">
        <a-input v-model="form.guardianName" />
      </a-form-model-item>
      <a-form-model-item label="家长电话">
        <a-input v-model="form.guardianPhone" />
      </a-form-model-item>
      <a-form-model-item label="家庭地址">
        <a-input v-model="form.address" />
      </a-form-model-item>
      <a-form-model-item label="家长邮箱">
        <a-input v-model="form.guardianEmail" />
      </a-form-model-item>
      <a-form-model-item label="家长微信">
        <a-input v-model="form.guardianWeChat" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          创建
        </a-button>
        <a-button style="margin-left: 10px;" @click="onCancel">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
  import student from "@/services/student"
  export default {
    name: 'add-student',
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        visible :false,
        desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
        form: {
          studentName: ''
        }
      };
    },
    methods:{
      onSubmit() {
        student.add(this.form).then(res => {
          console.log(res);
          this.visible = false;
        });
      },
      onCancel() {
        this.visible = false;
      }
    }
  };
</script>

<style scoped>

</style>
