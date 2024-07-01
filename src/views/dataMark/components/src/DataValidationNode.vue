<script setup lang="ts"></script>

<template>
  <el-card shadow="hover" class="mb-[20px] min-h-[160px]">
    <div class="card-top h-[86px] py-[20px] relative rounded-[10px]">
      <img src="@/assets/images/ejjd.png" class="w-[46px] h-[46px] mx-[10px]" />
      <span class="absolute">数据确权节点</span>
      <div
        class="bg_c regular-text-color absolute top-[45px] left-[66px] rounded-[24px] px-[4px] h-[16px] flex justify-center"
      >
        <span class="text-[12px] pr-[4px]">二级节点</span>
        <img src="@/assets/images/Vector.png" />
      </div>
    </div>
    <div class="relative text-[14px]">
      <span class="regular-text-color absolute top-[15px] left-[66px]"
        >节点标识前缀</span
      >
      <span class="regular-text-color absolute top-[35px] left-[66px]"
        >节点IP</span
      >
      <span class="absolute top-[15px] left-[200px]">MA.10000.900000</span>
      <span class="absolute top-[35px] left-[200px]">39.156.12.66</span>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.card-top {
  background-color: #e7f1fc;

  .bg_c {
    background-color: #fbfbfb;
  }
}

:deep(.el-card__body) {
  padding: 5px;
}
</style>
