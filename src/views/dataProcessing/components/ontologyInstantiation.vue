<template>
  <div class="dataCleaning">
    <el-row :gutter="40">
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="header_1">
            <h3>数据标识</h3>
          </div>

        </div>

        <div class="identificateCodeWay">
          <div class="title">选择数据集</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="grid-content ep-bg-purple">
          <div class="header_1">
            <h3>远程kafak服务器设置</h3>
          </div>

        </div>

        <div class="identificateCodeWay">
          <div class="title">选择数据集</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="identificateCodeWay">
          <div class="title">企业名称</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="identificateCodeWay">
          <div class="title">应用场景</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="identificateCodeWay">
          <div class="title">边缘网关</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="identificateCodeWay">
          <div class="title">设备ID</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="identificateCodeWay">
          <div class="title">数据类型</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in identificateCodeWay_options" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>

        </div>

        <div class="btns">

          <el-button type="primary" style="padding: 10px 40px;">生成数据标识</el-button>
       
<el-button type="primary" style="padding: 10px 40px;" @click="drawerVisible = true">标识配置映射表</el-button>

          <el-drawer title="标识配置映射表" :visible.sync="drawerVisible" direction="rtl" size="50%">
            <!-- 这里放置抽屉内部的内容，包括多个表格 -->
            <el-table :data="gridData">
              <el-table-column property="date" label="日期" width="150"></el-table-column>
              <el-table-column property="name" label="姓名" width="200"></el-table-column>
              <el-table-column property="address" label="地址"></el-table-column>
            </el-table>

            <!-- 可以继续添加更多的表格 -->
          </el-drawer>

          <div class="title">数据标识
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>


      </el-col>
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="chart">
            <div class="show">原始数据与赋码后数据展示区</div>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const drawerVisible = ref(false);
const file = ref('')
const mapping = ref('')
const fid = ref('')
const cid = ref('')
const dataType = ref('')
const c_way = ref('')
const s_path = ref('')

const datatype_options = [
  {
    value: '9600',
    label: '9600'
  }
]
const ontologyConstructionWay_options = [
  {
    value: '缺失值填充',
    label: '缺失值填充'
  }
]
const dialog = ref(false)
const table = ref(false)
const gridData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }
])
</script>

<style lang='scss' scoped>

.dataCleaning {
  width: 100%;
  font-size: 16px;
  .header_1,
  .header_2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }

  .identificateCodeWay {
    width: 100%;
    height: 90px;
    line-height: 40px;
    padding-left: 20px;
    margin-top: 10px;
  }

  .btns {
    width: 100%;
    height: 100%;
    line-height: 40px;
    padding-left: 20px;
  }

  .over_btn {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }

  .chart {
    width: 100%;
    height: 430px;
    margin-top: 20px;
    width:100%;
    border: 1px solid black; 
    overflow: auto;
     padding: 0 10px;
  }
  .show{
    margin-top: 25%;
    margin-left: 35%
  }

}
</style>
