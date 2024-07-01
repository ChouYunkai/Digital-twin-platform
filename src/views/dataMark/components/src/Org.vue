<script setup lang="ts">
import { ref } from "vue";
import { FormInstance } from "element-plus";

// 搜索表单数据
interface SearchData {
  companyAddress?: string; // 单位详细地址
  id?: string; // 机构id
  prefix?: string; // 前缀
}

// 表格数据接口
interface TableData {
  id?: string; // 机构id
  orgName?: string; // 机构名称
  prefix?: string; // 前缀
  companyType?: string; // 单位性质
  companyAddress?: string; // 单位详细地址
  certType?: string; // 单位证件类型
}

const loading = ref(false);

const searchFormRef = ref();
const searchForm = ref<SearchData>({});

const detailDrawer = ref(false);

const pagesOptions = ref<Pages>({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  disabled: false
});

const add = () => {};

const onSearch = () => {
  console.log(searchForm.value);
};

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

function openDialog(item: any) {
  console.log(item);
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const tableData: TableData[] = [
  {
    id: "12323444444444433454",
    orgName: "机构名称",
    prefix: "MA.113.120.0887788887",
    companyType: "国有控股",
    companyAddress: "字段内容",
    certType: "其他"
  },
  {
    id: "12323444444444433454",
    orgName: "机构名称",
    prefix: "MA.113.120.0887788887",
    companyType: "国有控股",
    companyAddress: "字段内容",
    certType: "其他"
  },
  {
    id: "12323444444444433454",
    orgName: "机构名称",
    prefix: "MA.113.120.0887788887",
    companyType: "国有控股",
    companyAddress: "字段内容",
    certType: "其他"
  },
  {
    id: "12323444444444433454",
    orgName: "机构名称",
    prefix: "MA.113.120.0887788887",
    companyType: "国有控股",
    companyAddress: "字段内容",
    certType: "其他"
  },
  {
    id: "12323444444444433454",
    orgName: "机构名称",
    prefix: "MA.113.120.0887788887",
    companyType: "国有控股",
    companyAddress: "字段内容",
    certType: "其他"
  }
];
</script>

<template>
  <div class="main">
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchForm"
      label-position="top"
      class="search-form bg-bg_color pl-[20px] pt-[12px] overflow-auto mb-[20px] rounded-[10px]"
    >
      <el-form-item label="标识地址">
        <el-input
          v-model="searchForm.companyAddress"
          placeholder="请输入机构名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="机构id">
        <el-input
          v-model="searchForm.id"
          placeholder="请输入机构id"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="标识前缀">
        <el-input
          v-model="searchForm.prefix"
          placeholder="请输入"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item class="ml-auto pt-[30px]">
        <el-button @click="resetForm(searchFormRef)"> 重置 </el-button>
        <el-button type="primary" :loading="loading" @click="onSearch">
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="bg-bg_color py-[20px] px-[20px] rounded-[10px]">
    <!-- 新增 icon 增不上 不明语法 -->
    <el-button type="primary" @click="add()">新增 </el-button>
    <el-table
      class="my-[20px]"
      :data="tableData"
      table-layout="auto"
      border
      :header-cell-style="{
        background: 'var(--el-fill-color-light)',
        color: 'var(--an-regular-text-color)',
        'font-weight': '400'
      }"
    >
      <el-table-column prop="id" label="机构id" />
      <el-table-column prop="orgName" label="机构名称" />
      <el-table-column prop="prefix" label="前缀" />
      <el-table-column prop="companyType" label="单位性质" />
      <el-table-column prop="companyAddress" label="单位详细地址" />
      <el-table-column prop="certType" label="单位证件类型" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="detailDrawer = true"
            >详情</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="openDialog(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗?">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagesOptions.currentPage"
      v-model:page-size="pagesOptions.pageSize"
      class="flex justify-end"
      :total="pagesOptions.total"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :disabled="pagesOptions.disabled"
      background
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-drawer v-model="detailDrawer" title="查看" direction="rtl">
    <span>Hi, there!</span>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
