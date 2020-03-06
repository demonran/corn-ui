<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-steps :current="currentStep" style="margin-bottom:30px">
      <a-step title="基本信息"></a-step>
      <a-step title="课程介绍" />
      <a-step title="完成" />
    </a-steps>

    <a-form :form="form" @submit="onsubmit">
      <div v-show="currentStep===0">
        <a-form-item label="课程标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-input
            v-decorator="['title', {rules: [{ required: true, message: '请输入课程标题' }]}]"
            placeholder="请输入课程标题"
          />
        </a-form-item>
        <a-form-item label="副标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-input
            v-decorator="['subTitle', {rules: [{ required: true, message: '请输入副标题' }]}]"
            placeholder="请输入副标题"
          />
        </a-form-item>
        <a-form-item label="课程分类" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-select
            class="style_input"
            placeholder=" 请选择课程分类"
            :allowClear="true"
            @change="categoryChange"
            v-decorator="['categoryId', {rules: [{ required: true, message: '请选择课程分类' }]}]"
          >
            <a-select-option
              v-for="(item, index) in categoryList"
              :key="index"
              :value="item.categoryId"
            >{{item.categoryName}}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="观看次数" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-input
            v-decorator="['name', {rules: [{ required: true, message: '请输入观看次数' }]}]"
            placeholder="请输入观看次数"
          />
        </a-form-item>-->
        <a-form-item label="是否免费" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-radio-group
            buttonStyle="solid"
            v-decorator="['isFree', {rules: [{ required: true, message: '请选择' }]}]"
            @change="isFreeClick"
          >
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-show="isFree" label="费用" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-input
            v-decorator="['price', {rules: [{ required: true, message: '请输入视频课程费用' }]}]"
            placeholder="请输入视频课程费用"
          />
        </a-form-item>
        <!-- <a-form-item label="是否推荐到首页" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-radio-group
            buttonStyle="solid"
            v-decorator="['weather', {rules: [{ required: true, message: '请选择' }]}]"
          >
            <a-radio value="0">否</a-radio>
            <a-radio value="1">是</a-radio>
          </a-radio-group>
        </a-form-item>-->
        <a-form-item label="主讲老师" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-select
            class="style_input"
            placeholder=" 请选择主讲老师"
            :allowClear="true"
            v-decorator="['teacherId', {rules: [{ required: true, message: '请选择主讲老师' }]}]"
          >
            <a-select-option
              v-for="(item, index) in teacherList"
              :key="index"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapperCol="{span: 10, offset: 7}">
          <a-button type="primary" @click="nextClick">下一步</a-button>
        </a-form-item>
      </div>

      <div v-show="currentStep===1">
        <a-form-item label="课程封面" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action
            accept=".jpg, .jpeg, .gif, .png, .bmp"
            :customRequest="uploadimg"
            :beforeUpload="beforeUpload"
            v-decorator="['cover', {rules: [{ required: true, message: '请上传封面' }]}]"
          >
            <img class="imgshow" v-if="cover" :src="cover" alt="cover" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="课程视频" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <!-- accept=".avi, .wmv, .mpg, .mpeg, .mov, .rm, .ram, .swf, .flv, .mp4" -->
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action
            :customRequest="uploadVideo"
            :beforeUpload="beforeVideoUpload"
            v-decorator="['videoUrl', {rules: [{ required: true, message: '请上传视频' }]}]"
          >
            <img class="imgshow" v-if="videoUrl" :src="videoUrl" alt="videoUrl" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
          <span>目前仅支持在手机端播放，建议时常2-10分钟，建议视频宽比16:9</span>
        </a-form-item>
        <a-form-item label="图文介绍" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
          <div
            style="width:550px"
            ref="editor"
            v-decorator="['content', {rules: [{ required: true, message: '请填写图文介绍' }]}]"
          ></div>
        </a-form-item>
        <a-form-item :wrapperCol="{span: 10, offset: 7}">
          <a-button @click="preClick">上一步</a-button>
          <a-button style="margin-left:10px" type="primary" @click="nextClick">下一步</a-button>
        </a-form-item>
      </div>

      <div v-show="currentStep===2" class="finish">
        <a-spin v-if="isSubmitting" tip="正在提交..."></a-spin>
        <div v-else>
          <a-button
            style="margin:20px 0"
            :icon="resultIcon"
            shape="circle"
            size="large"
            type="primary"
          ></a-button>
          <div style="color:#000;font-size:24px;margin-bottom:30px">{{resultString}}</div>
          <div>
            <a-button type="primary" @click="continueClick">继续添加</a-button>
            <a-button style="margin-left:10px" @click="backListClick">返回列表</a-button>
          </div>
        </div>
      </div>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
import VideoRequest from "@/services/videocourse";
import CommonRequest from "@/services/common";
import CategoryRequest from "@/services/category";
import TeacherRequest from "@/services/teacher";
import comm from "../mix";
import E from "wangeditor";

export default {
  mixins: [comm],
  data() {
    return {
      id: "",
      currentStep: 0,
      isFree: null,
      isSubmitting: false,
      hadInfo: false,
      form: this.$form.createForm(this),
      loading: false,
      categoryList: [], // 课程分类
      teacherList: [], // 老师列表
      cover: "", // 封面
      videoUrl: "", //视频路径
      content: "", //图文介绍
      resultString: "",
      resultIcon: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id || "";
    this.seteditor();
    if (this.id) {
      // 这是编辑
      TeacherRequest.teacherItem(this.id)
        .then(res => {
          console.log("teacherItem:", res);
          const data = res.result;
          this.form.setFieldsValue({
            address: data.address,
            avatar: data.avatar,
            content: data.content,
            experience: data.experience,
            name: data.name,
            school: data.school,
            categoryId: data.category.categoryId,
            tel: data.tel
          });
          this.avatar = data.avatar;
          this.content = data.content;
          this.editor.txt.html(this.content);
        })
        .catch(e => {
          console.log("error:", e);
        });
    } else {
      this.initFormData();
    }
    CategoryRequest.categoryList()
      .then(res => {
        this.categoryList = res.result;
      })
      .catch(e => {});
  },
  //   mounted() {
  // this.seteditor();
  // CategoryRequest.categoryList()
  //   .then(res => {
  //     this.categoryList = res.result;
  //   })
  //   .catch(e => {});
  //   },
  methods: {
    initFormData() {
      if (this.currentStep === 0) {
        this.form.setFieldsValue({
          categoryId: "",
          price: null,
          isFree: null,
          subTitle: "",
          teacherId: "",
          title: ""
        });
      } else if (this.currentStep === 1) {
        this.form.setFieldsValue({
          content: "",
          cover: "",
          videoUrl: ""
        });
        this.cover = "";
        this.content = "";
        this.editor.txt.html("");
      }
    },
    getTeacherList(categoryId) {
      const param = {
        categoryId: categoryId
      };
      TeacherRequest.getAllteacher(param)
        .then(res => {
          this.teacherList = res.result;
        })
        .catch(e => {});
    },
    isFreeClick(e) {
      this.isFree = e.target.value === 0;
    },
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
        this.content = html; // 绑定当前逐渐地值
        this.form.setFieldsValue({
          content: html
        });
      };
      // 创建富文本编辑器
      this.editor.create();
    },
    // 选择分类
    categoryChange(e) {
      this.getTeacherList(e);
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("图片不要超过10M哟");
      }
      return isLt10M;
    },
    beforeVideoUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("视频不要超过10M哟");
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
          this.cover = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally((this.loading = false));
    },
    // 上传视频
    uploadVideo(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      this.loading = true;
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.videoUrl = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally((this.loading = false));
    },
    // 点击上一步
    preClick() {
      this.currentStep = 0;
    },
    // 点击下一步
    nextClick() {
      var param = ["title", "subTitle", "categoryId", "isFree", "teacherId"];
      var hasFree = this.form.getFieldValue("isFree");
      if (this.currentStep === 0) {
        var temp = this.form.getFieldsValue();
        if (hasFree == 0) {
          param.push("price");
        }
        this.form.validateFields(param, (err, values) => {
          if (!err) {
            this.currentStep = 1;
            if (this.hadInfo) {
              this.initFormData();
              this.hadInfo = false;
            }
          }
        });
      } else if (this.currentStep === 1) {
        param = param.concat(["content", "cover", "videoUrl"]);
        if (hasFree == 0) {
          param.push("price");
        }
        this.form.validateFields(param, (err, values) => {
          if (!err) {
            // 第二步验证通过
            this.currentStep = 2;
            this.onsubmit(values);
          }
        });
      }
    },
    // 继续添加
    continueClick() {
      this.currentStep = 0;
      // 清除数据
      this.hadInfo = true;
      this.initFormData();
    },
    // 返回列表
    backListClick() {
      this.goResult();
    },
    onsubmit(values) {
      let that = this;
      that.isSubmitting = true;
      var param = Object.assign(values);
      param.cover = this.cover;
      param.content = this.content;
      param.videoUrl = this.videoUrl;
      if (param.isFree === 1) {
        param.price = 0;
      }
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
          })
          .finally((that.isSubmitting = false));
      } else {
        VideoRequest.add(param)
          .then(res => {
            this.resultString = "操作成功";
            this.resultIcon = "check";
            // that.goResult();
            // window.close();
          })
          .catch(e => {
            this.resultString = "操作失败";
            this.resultIcon = "close";
            console.log("error:", e);
          })
          .finally((that.isSubmitting = false));
      }
    },
    goResult() {
      this.$router.replace("/course/videocourse");
    }
  }
};
</script>

<style scoped lang="less">
.finish {
  text-align: center;
}
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
