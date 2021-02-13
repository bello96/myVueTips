<template>
  <div id="app">
    <button @click="showTips">弹出tip</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    /** 
      content：内容 必传
      position：显示位置 topRight topLeft bottomRight bottomLeft top bottom
      timeout：显示时间 默认5秒
      type: 类型 success error default
      btnText: 定义关闭按钮内容 默认✖
      center：内容是否居中显示 默认不居中
      showClose：是否可关闭 默认可以
    **/
    showTips() {
      this.$notify({
        content: "这是一条提示消息",
        timeout: 3,
        position: "top",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>
