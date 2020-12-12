<template>

  <a-modal
    :width="720"
    :title="crud.status.title"
    :visible="crud.status.cu > 0"
    :confirm-loading="crud.status.cu == 2"
    @cancel="crud.cancelCU"
    @ok="crud.submitCU"
  >
    <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
      <a-form-model-item label="文章标题" >
        <a-input placeholder="请输入文章标题" v-model="form.title"/>
      </a-form-model-item>
      <a-form-model-item label="文章摘要" >
        <a-input placeholder="请输入文章摘要" v-model="form.description"/>
      </a-form-model-item>
      <a-form-model-item label="所属分类" >
        <a-select
          class="style_input"
          placeholder="请选择所属分类"
          :allowClear="true"
          v-model="form.categoryId">
          <a-select-option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.categoryId"
          >{{item.categoryName}}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="作品图片" >
        <upload-img :value="form.cover"  @success="uploadSuccess" />
      </a-form-model-item>

      <a-form-model-item label="是否推荐到首页" >
        <a-radio-group buttonStyle="solid" v-model="form.recommend">
          <a-radio value=false>否</a-radio>
          <a-radio value=true>是</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="详细内容">
        <wang-editor :value="form.content" @setEditorValue="setEditorValue"  />
      </a-form-model-item>
    </a-form-model>
  </a-modal>


</template>

<script>
import CategoryRequest from "@/services/category";
import comm from "../../mix";
import CRUD, {form} from "@/components/Crud/curd";
import WangEditor from '@/components/wangeditor';
import uploadImg from '@/components/uploadImg'

export default {
  components: {uploadImg, WangEditor},
  mixins: [comm, form({})],
  data() {
    return {
      categoryList: [],
      rules: {
        title: [{required: true, message: '请输入文章标题'}],
      },
    };
  },

  methods: {
    [CRUD.HOOK.beforeToCU]() {
      this.getCategoryList()
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      form.categoryId = form.category.id
    },

    getCategoryList() {
      CategoryRequest.categoryList()
        .then(res => {
          this.categoryList = res.result;
        })
        .catch(e => {
        });
    },
    uploadSuccess(image) {
      this.form.cover = image
    },
    setEditorValue(value) {
      this.form.content = value
    }


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
