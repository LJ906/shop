<template>
  <div>
      <!-- {{log('render')}} -->
    <button @click="show = !show">{{show ? '销毁' : '显示'}}</button>
    <button v-if="show" v-append-text="`hello ${number}`" @click="number++">按钮 后的文字是动态加的</button>
  </div>
</template>
<script>
export default {
    data () {
        // this.log = window.console.log;
     },
    // 自定义指令 directives: {}  5个钩子函数
  directives: {
    appendText: {
      bind() {
        // console.log("bind");
      },
      inserted(el, binding) {
        // el 使用指令的节点
        //   binding是绑定的标签信息， value 为 指令绑定的值
        el.appendChild(document.createTextNode(binding.value));
        // console.log("inserted", el, binding);
      },
      update() {
        // console.log("update");
      },
      componentUpdated(el, binding) {
        el.removeChild(el.childNodes[el.childNodes.length - 1]);
        el.appendChild(document.createTextNode(binding.value));
        // console.log("componentUpdated", el, binding);
      },
      unbind() {
        // console.log("unbind");
      }
    }
  },
  data() {
    return {
      number: 1,
      show: true
    };
  },
  // beforeCreate () {
  //     console.log('beforeCreate');
  // },
  //   created () {
  //     console.log('created');
  // },
  // beforeMount () {
  //     console.log('beforeMount');
  // },
  //   mounted () {
  //     console.log('mounted');
  // },
  //   beforeUpdate () {
  //       console.log('beforeUpdate');
  // },
  //   updated () {
  //     console.log('updated');
  // },
  //   beforeDestroy () {
  //     console.log('beforeDestroy');
  // },
  //   destroyed () {
  //     console.log('destroyed');
  // },
};
</script>
