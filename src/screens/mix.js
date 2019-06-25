function fmtt(ival)
{
    let d =  new Date(ival * 1000);
    let m = d.getMonth()+1,dt = d.getDate(),h = d.getHours(),mi = d.getMinutes(),s=d.getSeconds();
    function f(v) {return v<10?"0"+v:v};
    return `${d.getFullYear()}-${f(m)}-${f(dt)} ${f(h)}:${f(mi)}:${f(s)}`;
}

export default {
    filters:{
      Time(ival) {
          return fmtt(ival);
      }
    },
    methods:{
        fmtRowTime(name) {
           return function(row) {
                return fmtt(row[name]);
           }
        },
        fmtTime(ival)
        {
            return fmtt(ival);
        },

        toast(text, error)
        {
            this.$message({
                type: error?'error':'success',
                message: text
            });
        },
        showConfirm(text,ok)
        {
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
               ok && ok();
              }).catch(() => {

                this.$message({
                  type: 'info',
                  message: '操作已取消'
                });          
              })
        },

        _selectImageSession()
        {
           let scope = this;
           return new Promise((resolve,reject)=>{
              Bus.$emit('selectImages',(rets)=>{
                  resolve(rets);
              });
           });
        },

        async selectImages()
        {
            let images = await this._selectImageSession();
            return images;
        },
        
        imgcropper()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('imgcropper',(rets)=>{
                  resolve(rets);
              });
            });
        },

        selectSku()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('selectSkus',(rets)=>{
                  resolve(rets);
              });
            });
        },
        selectGoods()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('selectGoods',(rets)=>{
                  resolve(rets);
              });
            });
        },
        selectPanorama()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('selectPanorama',(rets)=>{
                  resolve(rets);
              });
            });
        },
        selectCategory()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('selectCategory',(rets)=>{
                  resolve(rets);
              });
            });
        },
        getName()
        {
            let scope = this;
            return new Promise((resolve,reject)=>{
              Bus.$emit('getName',(rets)=>{
                  resolve(rets);
              });
            });
        },
        showLoading()
        {
          return this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
    }
}