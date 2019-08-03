<style lang="less" scoped>
.input-panel{
  display: flex;
  align-items: center;
  margin: 4px 0;

  .ok-btn{
      margin-left: 4px;
  }
  span{
      width: 90px;
      flex-shrink: 0;
  }
}
</style>

<template>
    <a-popover trigger="click" :visible="visibleId == id" @visibleChange="handleChange">
        <template slot="content">
             <div class="input-panel">
                <span>WarningType</span>
                <a-select size="small"  v-model="warningType" style="width: 100%" @change="handleChange">
                    <a-select-option value="Fake Votes">Fake Votes</a-select-option>
                    <a-select-option value="Fake Review [comment]">Fake Review [comment] </a-select-option>
                    <a-select-option value="Inappropriate Content ">Inappropriate Content  </a-select-option>
                    <a-select-option value="Duplicate Content">Duplicate Content</a-select-option>
                    <a-select-option value="Inappropriate Behavior">Inappropriate Behavior</a-select-option>
                    <a-select-option value="Custom">Custom </a-select-option>
                </a-select>
             </div>
            <div class="input-panel">
                 <span>Points</span>
                 <a-input placeholder="points" size="small" v-model="points"/>
             </div>

            <div class="input-panel">
                <a-input placeholder="feed back" size="small" v-model="text"/>
                <a-button ghost size="small" class="ok-btn" type="primary" @click="onConfirm">OK</a-button>
            </div>
        </template>
        <a @click="clickLabel">{{config.label}}</a>
    </a-popover>
</template>

<script>

export default {
    props:['config'],
    computed:{
        placeholder(){
            if( this.config.confirm.placeholder ) return this.config.confirm.placeholder;
            return ""
        },
        title(){
            alert(1);
            return this.config.confirm.title;
        },
        id()
        {
            return this.config.record[this.config.dbidField];
        }
    },
    data(){
        return {
            text:"",
            confirmState:window.confirmState,
            visibleId:"",
            points:"",
            warningType:""
        }
    },
    methods:{
        onConfirm() {
            let {confirm} = this.config.confirm;
            if( !confirm ) return;

            confirm.call(this, this.config.text,this.config.record, this.text);

            this.visibleId = null;
        },
        clickLabel()
        {
            this.visibleId = this.config.record[this.config.dbidField];
        },
        handleChange(visible)
        {
            if( !visible ) this.visibleId = null;
        }
    }
}
</script>