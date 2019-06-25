<style lang="less" scoped>
.filterGroup {
  display: flex;
  height: .88rem;
  .filterItem {
    position: relative;
    flex: 1;
    text-align: center;
    line-height: 0.88rem;
    color: #595959;
    font-size: .28rem;
    background: #fff;
    border-bottom: 0.01rem solid #f4f4f4;
    box-sizing: border-box;
    z-index: 9;

    &[active]{
      color: #E90505;
    }

    .icons{
      position: relative;
      height: .42rem;
      width: .3rem;
      display: inline-block;
      vertical-align: text-top;
      line-height: 1;
      
      .inficon{
        position: absolute;
        opacity: .4;
        left: 0;

        &:first-child{
          top: 0;
        }
        &:last-child{
          bottom: 0;
        }

        &[active]{
          opacity: 1;
        }
      }
    }

    > .inficon{
      transition: all .5s;
      &[active]{
        transform: rotate(180deg);
      }
    }
  }

  .filterDrop {
    position: absolute;
    left: 0;
    right: 0;
    height: calc(~'100% - .88rem');
    overflow: hidden;
    background: rgba(0,0,0,.5);
    z-index: 8;
    .drop-list {
      margin-top: .88rem;
      background: #fff;
      padding-left: 0.2rem;
      overflow: hidden;
      .list-item {
        height: 0.88rem;
        line-height: 0.88rem;
        &:not(:first-child) {
          border-top: 0.01rem solid #f4f4f4;
        }
      }
    }
  }
}

.open-enter-active{
  transition: .2s all;
  &.filterDrop{
    animation: bgOpen .2s ease-in both;
  }
  .drop-list{
    animation: dropDown .2s ease-out both;
  }
}
.close-leave-active{
  transition: .2s all;
  &.filterDrop{
    animation: bgClose .2s ease-out both;
  }
  .drop-list{
    animation: dropUp .2s ease-in both;
  }
}
.fade-enter-active{
  transition: .2s all;
  .drop-list{
    animation: dropDown .2s ease-in both;
  }
}
.fade-leave-active{
  transition: .2s all;
  .drop-list{
    animation: dropUp .2s ease-out both;
  }
}


@keyframes dropUp {
  from{
    transform: translateY(0);
  }
  to{
    transform: translateY(-100%);
  }
}
@keyframes dropDown {
  from{
    transform: translateY(-100%);
  }
  to{
    transform: translateY(0%);
  }
}
@keyframes bgClose {
  from{
    background: rgba(0, 0, 0, 0.5);
  }
  to{
    background: rgba(0, 0, 0, 0);
  }
}
@keyframes bgOpen {
  from{
    background: rgba(0, 0, 0, 0);
  }
  to{
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
<template>
  <div class="filterGroup">
    <div class="filterItem" v-for="(item, i) in fmtData" :key="i" @click="trigger(i)" :active="i == currentIndex">
      {{selected[i] ? selected[i].key : '全部'}}
      <icon :active="i == selectedIndex" v-if="!!fmtData[i].value"  type="arrowbottom"/>
      <div v-else class="icons">
        <icon :active="selected[i].value == 'asc'" type="arrowtop"/>
        <icon :active="selected[i].value == 'desc'" type="arrowbottom"/>
      </div>
    </div>
    <transition :name="animation" @after-leave="afterClose" @after-enter="afterOpen">
      <div v-if="openList.length" class="filterDrop" @click="close">
        <div class="drop-list">
          <div class="list-item" v-for="(item, i) in openList" :key="i" @click="choose(item.value)">{{item.key}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import icon from "../icon";

export default {
  components: {
    icon
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: {},
      observer(o){
        console.log(o);
        this.initData()
      }
    }
  },
  data() {
    return {
      fmtData: [],
      currentIndex: -1,
      selectedIndex: -1,
      openList: [],
      selected: [],
      animation: ''
    };
  },
  methods: {
    initData(){
      let fmtData = [];
      let selected = [];
      for(var name in this.data){
        let isSort = typeof this.data[name] == 'string'
        if(isSort){
          selected.push({key: this.data[name], value: 'default'})
        }else{
          selected.push(this.data[name][0]);
        } 
        fmtData.push({
          name: name,
          value: isSort ? null : this.data[name]
        });
      }
      this.fmtData = fmtData;
      this.selected = selected;
    },
    choose(value){
      let selected = this.fmtSelect(this.currentIndex, value);
      this.selected[this.currentIndex] = selected;
      this.selected = this.selected.slice();
      this.$emit('change', Object.assign({name: this.fmtData[this.currentIndex].name}, selected));
    },
    close(){
      this.selectedIndex = -1;
      this.openList = [];
    },
    trigger(i) {
      this.currentIndex = i;
      // 是否是升降序查询
      if(!this.fmtData[i].value){
        this.selectedIndex = -1;
        this.openList = [];
        this.choose(this.selected[i].value);
        return;
      }
      // 打开
      if(this.selectedIndex == -1){
        this.animation = "open"
        this.selectedIndex = i;
        this.openList = this.fmtData[i].value;
        return;
      }
      this.selectedIndex = this.selectedIndex == i ? -1 : i;
      this.animation = this.selectedIndex >= 0 ? "fade" : "close"
      this.openList = [];
    },
    afterOpen(){
      this.animation = "fade"
    },
    afterClose() {
      if(this.selectedIndex >= 0){
        this.openList = this.fmtData[this.selectedIndex].value;
      }
    },
    fmtSelect(i, value){
      let list = this.fmtData[i].value;

      if(!list){
        let selected = this.selected[i];
        switch(value){
          case 'default': value = 'asc'; break;
          case 'asc': value = 'desc'; break;
          case 'desc': value = 'default'; break;
        }
        selected.value = value;
        return selected;
      }
      return list.find(item => {
        return item.value == value;
      }) || {}
    },
  },
  mounted() {
    this.initData(this.data);
  }
};
</script>
