<template>
  <page-layout title="banner设置">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
    <a-form :form="form"  @submit="onsubmit">
      <a-form-item label="机构名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input readonly
          value="哎呀呀,我是不可以更改的"
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
  import info from '@/services/information';


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
    activated() {

        // 这是编辑
        info.infoItem()
          .then(res => {
            console.log("infoItem:", res);
            const data = res.result;
            this.form.setFieldsValue({
              /* address: data.address,
              cover: data.cover,
              createdAt:data.createdAt,
              description: data.description,
              id: data.id,
              name: data.name,
              tel: data.tel */
              address: '我是地址地址',
              cover: '我是地址地址',
              description: "我是描述",
              tel: "我是电话"
            });
            this.avatar = data.avatar;
            this.description = data.description;
            this.editor.txt.html(this.description);
            console.log("infoItem:", res);
          })
          .catch(e => {
            console.log("error:", e);
          });

    },
    mounted() {


    },

    methods: {

		edt(data) {
		  this.$router.push({
		    path: "/settings/edtInfo",
		    query: { id: data.id }
		  });
		},
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = Object.assign(values);
         // param.description = this.description;
console.log(param)
            //编辑
            info.EdtItem(param)
              .then(res => {
                that.toast("修改成功");
                that.goResult();
              })
              .catch(e => {
                console.log("error:", e);
              });

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
