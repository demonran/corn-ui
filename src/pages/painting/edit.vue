<template>
  <a-modal
    :title="crud.status.title"
    :visible="crud.status.cu > 0"
    :confirm-loading="crud.status.cu == 2"
    @cancel="crud.cancelCU"
    @ok="crud.submitCU">

    <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
      <a-form-model-item label="作品名称">
        <a-input placeholder="请输入作品名称" v-model="form.name"/>
      </a-form-model-item>
      <a-form-model-item label="作者姓名">
        <a-input placeholder="请输入作者姓名" v-model="form.author"/>
      </a-form-model-item>
      <a-form-model-item label="所属分类">
        <a-select
          placeholder="请选择所属分类"
          :allowClear="true"
          v-model="form.categoryId"
        >
          <a-select-option v-for="(item, index) in categoryList" :key="index" :value="item.categoryId">
            {{item.categoryName}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="作品图片">
        <upload-img :value="form.image"  @success="uploadSuccess" />
      </a-form-model-item>
      <a-form-model-item label="是否推荐到首页">
        <a-radio-group
          buttonStyle="solid"
          v-model="form.recommend"
        >
          <a-radio :value="false">否</a-radio>
          <a-radio :value="true">是</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
  import CategoryRequest from "@/services/category";
  import comm from "../mix";
  import CRUD, {form} from "@/components/Crud/curd";
  import uploadImg from '@/components/uploadImg'

  export default {
    components: {uploadImg},
    mixins: [comm, form({})],
    data() {
      return {
        categoryList: [], // 课程分类
        rules: {
          name: [{required: true, message: '请输入作品名称'}],
          author: [{required: true, message: '请输入作者姓名'}],
          categoryId: [{required: true, message: '请选择所属分类'}],
          image: [{required: true, message: '请上传图片'}]
        }
      };
    },

    methods: {
      [CRUD.HOOK.beforeToCU]() {
        this.getCategoryList()
      },
      [CRUD.HOOK.beforeToEdit](crud, form) {
        form.categoryId = form.category.id
      },
      uploadSuccess(image) {
        this.form.image = image
      },
      getCategoryList() {
        CategoryRequest.categoryList()
          .then(res => {
            this.categoryList = res.result;
          })
          .catch(e => {
          });
      },
    }
  };
</script>

<style scoped lang="less">
  .avatar-uploader {
    width: 128px;
    height: 128px;

    .imgshow {
      width: 128px;
      height: 128px;
    }
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
