<template>
  <page-layout title="banner设置">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="机构名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '给机构起个名字' }] }]"
        />
      </a-form-item>
      <!-- <a-form-item label="logo" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
         <a-upload
           name="imageUrl"
           listType="picture-card"
           class="avatar-uploader"
           :showUploadList="false"
           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
           :beforeUpload="beforeUpload"
           @change="handleChange"
           v-decorator="['imageUrl',{rules: [{ required: false, message: ''}]}]"
         >
           <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
           <div v-else>
             <a-icon :type="loading ? 'loading' : 'plus'" />
             <div class="ant-upload-text">Upload</div>
           </div>
         </a-upload>
      </a-form-item> -->
	   <a-form-item label="机构简介" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="['description', { rules: [{ required: true, message: '给机构起个名字' }] }]"
      />
	   </a-form-item>
		<a-form-item label="联系电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
		  <a-input
		    v-decorator="['tel', { rules: [{ required: true, message: '给机构起个名字' }] }]"
		  />
		</a-form-item>

   <!-- <a-form-item label="机构地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'address',
          { rules: [{ required: true, message: '请选择地址' }] },
        ]"
      >
        <a-select-option value="" placeholder="选择省">
          四川
        </a-select-option>
        <a-select-option value="" placeholder="选择市">
          成都
        </a-select-option>
        <a-select-option value="" placeholder="选择区">
          天府新区
        </a-select-option>
      </a-select>
    </a-form-item> -->
    <a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="['address', { rules: [{ required: true, message: '请输入详细地址' }] }]"
      />
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
  import Banners from '@/services/information';


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
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleChange(info) {
              if (info.file.status === 'uploading') {
                this.loading = true;
                return;
              }
              if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                  this.imageUrl = imageUrl;
                  this.loading = false;
                });
              }
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
