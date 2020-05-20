<template>
  <div style="background: #f1f1f1">
    <p>{{keyPath ?  '您已经上传支付证书了！': '请上传支付证书！'}}</p>
    <a-upload
      :customRequest="upload"
      :file-list="fileList"
    >
      <a-button> <a-icon type="upload" /> {{keyPath ? '重新上传': '上传'}} </a-button>
    </a-upload>
  </div>

</template>

<script>
  import CommonRequest from '@/services/common'
    export default {
        name: "mch-key-path",
      props:['keyPath'],
      data() {
          return {
            fileList:[]
          }
      },
      methods:{
        upload(option) {
          const formData = new FormData();
          formData.append("file", option.file);
          const file = {uid: '1',name: option.file.name, status: 'uploading'}
          this.fileList.push(file)
          CommonRequest.uploadImg(formData).then(res => {
            file.status = 'done'
            this.$emit("success", res.result)
          }).catch(() => {
            file.status = 'error'
          })
        }
      }

    }
</script>

<style scoped>

</style>
