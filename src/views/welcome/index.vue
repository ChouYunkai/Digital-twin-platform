<template>
  <div class="iframe-container">
    <iframe
      id="myIframe"
      src="https://fengtianxi001.github.io/MF-TurbineMonitor/"
      scrolling="no"
      frameborder="0"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<script>
export default {
  name: "MyComponent"
};
</script>

<style scoped>
.iframe-container {
  position: center;
  width: 100%;
  height: 100%; /* 使用100vh使得iframe高度占据整个视口高度 */
  overflow: hidden; /* 确保iframe的内容不会超出容器 */
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none; /* 移除边框 */
}
</style>
