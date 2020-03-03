<template>
  <div>
    <a-form :form="form" style="max-width: 750px; margin: 40px auto 0;">
<a-form-item label="Upload" extra="img">
       <!-- <a-upload
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
        </a-upload> -->
    </a-form-item>
      <a-form-item>
        <tinymce  v-decorator="['content',{rules: [{ required: true, message: '输入课程详情'}]}]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce/tinymce.vue';
import {mapActions} from 'vuex';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
export default {
  name: 'Step2',
  components: {tinymce},
  data () {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      loading: false,
    };
  },
mounted() {
  this.form.setFieldsValue(this.$route.params.data);
  console.log('rowData step 2',this.$route.params.data)
},
  methods: {

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
		editImage(id){
		  Category.image(id).then(res => {
		    console.log(res)
		  })
		},
    nextStep () {
      this.form.validateFields((error, values) => {
        if (error) return;

        this.values = values;
        this.$emit('nextStep');
      });
    },
    prevStep () {
      this.$emit('prevStep');
    }
  }
};
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;
    :global {
      .ant-form-item-label,
      .ant-form-item-control {
        line-height: 22px;
      }
    }
  }
</style>
