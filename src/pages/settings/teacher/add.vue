<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="教师名称" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['name', {rules: [{ required: true, message: '请输入教师名称' }]}]"
          placeholder="请输入教师名称"
        />
      </a-form-item>
      <a-form-item label="教学类型" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <!-- <a-input
          v-decorator="['teachCategory', {rules: [{ required: true, message: '请输入教学类型' }]}]"
          placeholder="请输入教学类型"
        />-->
        <a-select
          class="style_input"
          placeholder="请选择教学类型"
          :allowClear="true"
          v-decorator="['categoryId', {rules: [{ required: true, message: '请选择教学类型' }]}]"
        >
          <a-select-option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.categoryId"
          >{{item.categoryName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="毕业学校" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['school', {rules: [{ required: true, message: '请输入毕业学校' }]}]"
          placeholder="请输入毕业学校"
        />
      </a-form-item>
      <a-form-item label="居住地址" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['address', {rules: [{ required: true, message: '请输入居住地址' }]}]"
          placeholder="请输入居住地址"
        />
      </a-form-item>
      <a-form-item label="教学经验" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['experience', {rules: [{ required: true, message: '请输入教学经验' }]}]"
          placeholder="请输入教学经验"
        />
        <!-- <a-select
          class="style_input"
          placeholder="请选择教学经验"
          :allowClear="true"
          v-decorator="['experience', {rules: [{ required: true, message: '请选择教学经验' }]}]"
        >
          <a-select-option :value="1">经验1</a-select-option>
          <a-select-option :value="2">经验2</a-select-option>
        </a-select>-->
      </a-form-item>
      <a-form-item label="联系电话" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['tel', {rules: [{ required: true, message: '请输入联系电话' }]}]"
          placeholder="请输入联系电话"
          maxlength="11"
        />
      </a-form-item>
      <a-form-item label="头像" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          v-decorator="['avatar', {rules: [{ required: true, message: '请上传头像' }]}]"
        >
          <img class="imgshow" v-if="avatar" :src="avatar" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <!-- <a-form-item label="是否推荐到首页" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['weather', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio value="0">否</a-radio>
          <a-radio value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否启用" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['weather', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio value="0">否</a-radio>
          <a-radio value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>-->
      <a-form-item label="详细介绍" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <div
          ref="editor"
          v-decorator="['description', {rules: [{ required: true, message: '请填写详细介绍' }]}]"
        ></div>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">保存</a-button>
        <a-button style="margin-left:10px" @click="cancelClick">取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
import TeacherRequest from "@/services/teacher";
import CommonRequest from "@/services/common";
import CategoryRequest from "@/services/category";
import comm from "../../mix";
import E from "wangeditor";

export default {
  mixins: [comm],
  data() {
    return {
      id: "",
      form: this.$form.createForm(this),
      loading: false,
      categoryList: [], // 课程分类
      avatar: "", // 头像
      description: "" //富文本内容
    };
  },
  activated() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      // 这是编辑
      TeacherRequest.teacherItem(this.id)
        .then(res => {
          console.log("teacherItem:", res);
          const data = res.result;
          this.form.setFieldsValue({
            address: data.address,
            avatar: data.avatar,
            description: data.description,
            experience: data.experience,
            name: data.name,
            school: data.school,
            categoryId: data.category.categoryId,
            tel: data.tel
          });
          this.avatar = data.avatar;
          this.description = data.description;
          this.editor.txt.html(this.description);
        })
        .catch(e => {
          console.log("error:", e);
        });
    } else {
      this.form.setFieldsValue({
        address: "",
        avatar: "",
        description: "",
        experience: "",
        name: "",
        school: "",
        categoryId: "",
        tel: ""
      });
      this.avatar = "";
      this.description = "";
      this.editor.txt.html("");
    }
  },
  mounted() {
    this.seteditor();
    CategoryRequest.categoryList()
      .then(res => {
        this.categoryList = res.result;
      })
      .catch(e => {});
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 将图片大小限制为 1M
      this.editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      this.editor.customConfig.zIndex = 1;
      this.editor.customConfig.pasteFilterStyle = false;

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        // 'list', // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen" // 全屏
      ];
      const that = this;
      this.editor.customConfig.customAlert = function(info) {
        if (info.indexOf("图片验证未通过") !== -1) {
          alert("服务器带宽限制图片不能超过1M，请重新选择");
        } else {
          alert(info);
        }
      };
      this.editor.customConfig.customUploadImg = function(files, insert) {
        const file = files[0];
        const params = new FormData();
        params.append("file", file);
        CommonRequest.uploadImg(params)
          .then(res => {
            console.log("res:", res);
            insert(res.data.url);
          })
          .catch(e => {
            that.toast(e, true);
            console.log("something error", e);
          })
          .finally((this.loading = false));
      };
      this.editor.customConfig.onchange = html => {
        this.description = html; // 绑定当前逐渐地值
        this.form.setFieldsValue({
          description: html
        });
      };
      // 创建富文本编辑器
      this.editor.create();
    },
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
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.avatar = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally((this.loading = false));
    },
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = Object.assign(values);
          param.avatar = this.avatar;
          param.description = this.description;
          if (that.id) {
            //编辑
            param.id = this.id;
            TeacherRequest.teacherEdtItem(param)
              .then(res => {
                that.toast("修改成功");
                that.goResult();
              })
              .catch(e => {
                console.log("error:", e);
              });
          } else {
            TeacherRequest.add(param)
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
      this.$router.replace("/settings/teacher");
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
