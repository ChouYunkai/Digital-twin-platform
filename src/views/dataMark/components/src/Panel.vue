<script setup lang="ts">
import DataValidationNode from "./DataValidationNode.vue"; //数据确权节点
import MarkRegisterStats from "./MarkRegisterStats.vue"; //标识注册统计
import MarkParseStats from "./MarkParseStats.vue"; //标识解析统计
import DataStats from "./DataStats.vue"; //数据统计
import OrgIndustryAnalysis from "./OrgIndustryAnalysis.vue"; //机构行业分析
import IndustryRegisterStats from "./IndustryRegisterStats.vue"; //行业注册分析
import OrgStats from "./OrgStats.vue"; //机构统计
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8" style="min-height: 200px">
      <!--    数据确权节点      -->
      <el-col style="min-height: 200px">
        <DataValidationNode />
      </el-col>
      <!--    数据统计      -->
      <el-col style="min-height: 200px">
        <DataStats />
      </el-col>
      <!--    机构统计      -->
      <el-col style="min-height: 300px">
        <OrgStats />
      </el-col>
    </el-col>
    <el-col :span="8" style="min-height: 200px">
      <!--    标识注册统计      -->
      <el-col style="min-height: 200px">
        <MarkRegisterStats />
      </el-col>
      <!--    机构行业分析      -->
      <el-col style="min-height: 200px">
        <OrgIndustryAnalysis />
      </el-col>
    </el-col>
    <el-col :span="8" style="min-height: 200px">
      <!--    标识解析统计      -->
      <el-col style="min-height: 200px">
        <MarkParseStats />
      </el-col>
      <!--    行业注册分析      -->
      <el-col style="min-height: 200px">
        <IndustryRegisterStats />
      </el-col>
    </el-col>
  </el-row>
</template>
