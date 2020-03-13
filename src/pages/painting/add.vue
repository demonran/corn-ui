<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="作品名称" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['name', {rules: [{ required: true, message: '请输入作品名称' }]}]"
          placeholder="请输入作品名称"
        />
      </a-form-item>
      <a-form-item label="作者姓名" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['author', {rules: [{ required: true, message: '请输入作者姓名' }]}]"
          placeholder="请输入作者姓名"
        />
      </a-form-item>
      <a-form-item label="所属分类" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <!-- <a-input
          v-decorator="['teachCategory', {rules: [{ required: true, message: '请输入教学类型' }]}]"
          placeholder="请输入教学类型"
        />-->
        <a-select
          class="style_input"
          placeholder="请选择所属分类"
          :allowClear="true"
          v-decorator="['categoryId', {rules: [{ required: true, message: '请选择所属分类' }]}]"
        >
          <a-select-option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.categoryId"
          >{{item.categoryName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="作品图片" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          v-decorator="['image', {rules: [{ required: true, message: '请上传图片' }]}]"
        >
          <img class="imgshow" v-if="image" :src="image" alt="image" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="是否推荐到首页" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['recommend', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- <a-form-item label="是否启用" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['weather', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio value="0">否</a-radio>
          <a-radio value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>-->
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">保存</a-button>
        <!-- <a-button style="margin-left:10px" @click="cancelClick">取消</a-button> -->
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
import PaintRequest from "@/services/painting";
import CommonRequest from "@/services/common";
import CategoryRequest from "@/services/category";
import comm from "../mix";

export default {
  mixins: [comm],
  data() {
    return {
      id: "",
      form: this.$form.createForm(this),
      loading: false,
      categoryList: [], // 课程分类
      image: "" // 头像
    };
  },
  activated() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      // 这是编辑
      PaintRequest.getItem(this.id)
        .then(res => {
          console.log("getItem:", res);
          const data = res.result;
          this.form.setFieldsValue({
            author: data.author,
            image: data.image,
            name: data.name,
            categoryId: data.category.id,
            recommend: data.recommend ? 1 : 0
          });
          this.image = data.image;
        })
        .catch(e => {
          console.log("error:", e);
        });
    } else {
      this.form.setFieldsValue({
        author: "",
        image: "",
        name: "",
        categoryId: null,
        recommend: null
      });
      this.image = "";
    }
    CategoryRequest.categoryList()
      .then(res => {
        this.categoryList = res.result;
      })
      .catch(e => {});
  },
  mounted() {},
  methods: {
    beforeUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   if (!isJPG) {
      //     this.$message.error("You can only upload JPG file!");
      //   }
      // 暂时只判断图片大小不超过10M
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("图片不要超过10M哟");
      }
      return isLt10M;
    },
    // 上传图片
    uploadimg(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      this.loading = true;
      this.showLoading();
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.image = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally(e => {
          this.loading = false;
          this.hideLoading();
        });
    },
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = Object.assign(values);
          param.image = this.image;
          param.recommend = param.recommend === 1;
          if (that.id) {
            //编辑
            param.id = this.id;
            PaintRequest.edtItem(param)
              .then(res => {
                that.toast("修改成功");
                that.goResult();
              })
              .catch(e => {
                console.log("error:", e);
              });
          } else {
            PaintRequest.add(param)
              .then(res => {
                that.toast("新增成功");
                that.goResult();
                // window.close();
              })
              .catch(e => {
                console.log("error:", e);
              });
          }
        }
      });
    },
    cancelClick() {
      // todo
    },
    goResult() {
      this.$router.replace("/painting/list");
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
