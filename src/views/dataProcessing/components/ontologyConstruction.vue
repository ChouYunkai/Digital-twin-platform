<template>
  <div class="dataCleaning">
    <el-row :gutter="40">
      <el-col :span="12" class="grid-item">
        <div class="grid-content ep-bg-purple">
          <!-- Content of the first column -->
        </div>
      </el-col>
      <el-col :span="12" class="grid-item">
        <div class="grid-content ep-bg-purple">
          <div class="header_1">
            <h3>本体构建</h3>
          </div>
          <div class="object">
            <span class="title">对象</span>
            <el-select v-model="dataType" style="width: 280px">
              <el-option v-for="item in datatype_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="classfication">
            <div class="title">类别</div>
            <el-select v-model="dataType" style="width: 280px">
              <el-option v-for="item in datatype_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>

        </div>
        <div class="grid-content ep-bg-purple">
          <div class="header_1">
            <h3>实例映射</h3>
          </div>
          <div class="mapping">
            <div class="title">映射</div>
            <el-select v-model="dataType" style="width: 600px">
              <el-option v-for="item in datatype_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="btns">
            <el-button type="primary" style="padding: 10px 60px;">赋值</el-button>
            <el-button type="danger" style="padding: 10px 30px;">停止</el-button>
            <div class="time-box"
              :style="{ margin: '10px 0 15px 20px', fontSize: '14px', color: '#ccc', display: 'inline-block' }">
              {{ time1 }}
            </div>
          </div>

        </div>
        <div class="grid-content ep-bg-purple">
          <div class="header_1">
            <h3>属性赋值</h3>
          </div>
          <div class="mapping">
            <span class="title">数据</span>
            <el-input v-model="file" style="width: 600px;max-width: 220%" class="input-with-select">
              <template #append>
                <el-button>...</el-button>
              </template>
            </el-input>
          </div>
          <div class="btns">
            <el-button type="primary" style="padding: 10px 60px;">赋值</el-button>
            <el-button type="danger" style="padding: 10px 30px;">停止</el-button>
            <div class="time-box"
              :style="{ margin: '10px 0 15px 20px', fontSize: '14px', color: '#ccc', display: 'inline-block' }">
              {{ time2 }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const file = ref('')
const mapping = ref('')
const fid = ref('')
const cid = ref('')
const dataType = ref('')
const c_way = ref('')
const s_path = ref('')
const time1 = ref('时间0.4s')
const time2 = ref('时间0.5s')

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

</script>

<style lang='scss' scoped>
.dataCleaning {
  width: 100%;
  height: 600px;
  font-size: 16px;

  .grid-item {
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  .header_1 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .object,
  .classfication,
  .mapping {
    width: calc(50% - 20px);
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 20px;
  }

  .object .title,
  .classfication .title,
  .mapping .title {
    display: block;
    padding-bottom: 10px;
  }

  .btns {
    width: calc(100% - 40px);
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .btns el-button {
    margin-right: 20px;
  }

  .input-with-select {
    max-width: calc(100% - 40px);
  }
}
</style>
