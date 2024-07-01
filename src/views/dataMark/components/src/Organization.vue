<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const options = [
  {
    value: "本机机构",
    label: "本机机构"
  },
  {
    value: "测试2级节点",
    label: "测试2级节点"
  },
  {
    value: "测试3级节点",
    label: "测试3级节点"
  }
];
const input = ref("");
</script>

<template>
  <div class="organization">
    <el-select v-model="value" class="select" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        clearable
      />
    </el-select>
    <el-input v-model="input" class="input" placeholder="数据确权节点" />
  </div>
</template>

<style scoped lang="scss">
.organization {
  margin: 10px 0 30px;
  text-align: end;

  .select {
    width: 180px;
    background-color: #e7f2fc;
    border-radius: 10px 0 0 10px;
  }

  .input {
    width: 180px;
    margin-right: 10px;
    border-radius: 0 10px 10px 0;
  }

  :deep(.el-select__wrapper) {
    background-color: #e7f2fc;
    box-shadow: none;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
}
</style>
