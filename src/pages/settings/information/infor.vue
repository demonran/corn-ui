<template>
  <page-layout title="banner设置">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="机构名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '给机构起个名字' }] }]"
        />
      </a-form-item>
      <a-form-item label="幻灯图片" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '给机构起个名字' }] }]"
        />
      </a-form-item> 
    <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
        placeholder="Select a option and change input text above"
        
      >
        <a-select-option value="male">
          male
        </a-select-option>
        <a-select-option value="female">
          female
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>

    </a-card>
  </page-layout>
</template>

<script>

  import PageLayout from '@/layouts/PageLayout';
  //import Banners from '@/services/information';


  export default {
    name: 'PageView',

    components: {PageLayout},
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),

      };
    },
    computed: {},
    created() {
    },
    mounted() {


    },

    methods: {
      handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
              if (!err) {
                console.log('Received values of form: ', values);
              }
            });
          },

    }
  };
</script>


<style lang="less" scoped>

  .btn {
    margin-top: 3px;
  }

  .search-btn {
    margin-left: 14px;
    margin-right: 9px;
  }

  .course-list {
    min-height: ~'calc(100vh - 320px)'
  }

  .table {
    border: 1px solid #e8e8e8;

    td {
      padding: 0 !important;
    }
  }

  .btn.fr {
    float: right;
    margin-left: 5px;
  }

</style>
