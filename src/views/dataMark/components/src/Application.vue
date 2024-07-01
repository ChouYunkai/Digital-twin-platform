<script setup lang="ts">
import { ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

// 搜索表单数据
interface SearchData {
  originType?: string; // 来源类型
  field?: string; // 字段选择
  fieldValue?: string; // 字段值
}

// 表单数据接口
interface FormData {
  appName?: string; // 应用名称
  appKey?: string; // 应用key
  appSecretKey?: string; // 应用密钥
  serviceInfo?: string; // 服务信息
  company?: string; // 研发单位
  appUserNumber?: number; // 应用用户量
  originType?: string; // 来源
  organization?: string; // 机构
  appDesc?: string; // 描述
}

// 表格数据接口
interface TableData {
  id?: string | number; // 机构id
  appName?: string; // 应用名称
  appDesc?: string; // 应用描述
  serviceInfo?: string; // 服务信息
  company?: string; // 研发单位
  appKey?: string; // 应用key
}

const loading = ref(false);

const searchFormRef = ref();
const searchData = ref<SearchData>({});

const addFormRef = ref();
const addFormData = ref<FormData>({});
const addFormRules = ref<FormRules<FormData>>({
  appName: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
  appKey: [{ required: true, message: "请选择应用key", trigger: "blur" }],
  appSecretKey: [
    { required: true, message: "请选择应用密钥", trigger: "blur" }
  ],
  serviceInfo: [{ required: true, message: "请输入服务信息", trigger: "blur" }],
  company: [{ required: true, message: "请输入研发单位", trigger: "blur" }],
  appUserNumber: [
    { required: true, message: "请输入应用用户量", trigger: "blur" }
  ],
  originType: [{ required: true, message: "请选择来源", trigger: "blur" }],
  organization: [{ required: true, message: "请输入机构", trigger: "blur" }]
});

// 分页
const pagesOptions = ref<Pages>({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  disabled: false
});

// 打开添加/编辑
const dialogFormVisible = ref(false);
const dialogFormTitle = ref("新增");
// 详情
const detailDrawer = ref(false);

const add = () => {
  dialogFormTitle.value = "新增";
  dialogFormVisible.value = true;
};

const onSearch = () => {};

const handleSizeChange = (val: number) => {
  console.log(val);
};
const handleCurrentChange = (val: number) => {
  console.log(val);
};

function openDialog(item: any) {
  if (item) {
    dialogFormTitle.value = "修改";
  }
  dialogFormVisible.value = true;
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
    id: 12,
    appName: "应用名称",
    appDesc: "默认描述",
    serviceInfo: "192.131.2.1",
    company: "单位名称",
    appKey: "732uu3u2u3uy8832kio2i3323j2"
  },
  {
    id: 12,
    appName: "应用名称",
    appDesc: "默认描述",
    serviceInfo: "192.131.2.1",
    company: "单位名称",
    appKey: "732uu3u2u3uy8832kio2i3323j2"
  },
  {
    id: 12,
    appName: "应用名称",
    appDesc: "默认描述",
    serviceInfo: "192.131.2.1",
    company: "单位名称",
    appKey: "732uu3u2u3uy8832kio2i3323j2"
  }
];
</script>

<template>
  <div class="main">
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchData"
      label-position="top"
      class="search-form bg-bg_color pl-[20px] pt-[12px] overflow-auto mb-[20px] rounded-[10px]"
    >
      <el-form-item label="来源类型">
        <el-input
          v-model="searchData.originType"
          placeholder="请输入来源类型"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="字段选择">
        <el-select
          v-model="searchData.field"
          placeholder="请选择字段"
          class="!w-[180px]"
        >
          <el-option label="私有" value="私有" />
          <el-option label="公有" value="公有" />
        </el-select>
      </el-form-item>
      <el-form-item label="字段值">
        <el-input
          v-model="searchData.fieldValue"
          placeholder="请输入字段值"
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
      <el-table-column prop="appName" label="应用名称" />
      <el-table-column prop="appDesc" label="应用描述" />
      <el-table-column prop="serviceInfo" label="服务信息" />
      <el-table-column prop="company" label="研发单位" />
      <el-table-column prop="appKey" label="应用key" />
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

  <el-dialog v-model="dialogFormVisible" :title="dialogFormTitle" width="500">
    <el-form
      ref="addFormRef"
      :model="addFormData"
      :rules="addFormRules"
      label-position="top"
    >
      <el-form-item label="应用名称" prop="appName" label-width="140px">
        <el-input
          v-model="addFormData.appName"
          autocomplete="off"
          placeholder="请输入应用名称"
        />
      </el-form-item>
      <el-form-item label="应用key" prop="appKey" label-width="140px">
        <el-input v-model="addFormData.appKey">
          <template #append>
            <el-button type="primary">生成</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="应用密钥 " prop="appSecretKey" label-width="140px">
        <el-input v-model="addFormData.appSecretKey">
          <template #append>
            <el-button type="primary">生成</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="服务信息" prop="serviceInfo" label-width="140px">
        <el-input
          v-model="addFormData.serviceInfo"
          autocomplete="off"
          placeholder="请输入服务信息"
        />
      </el-form-item>
      <el-form-item label="研发单位" prop="company" label-width="140px">
        <el-input
          v-model="addFormData.company"
          autocomplete="off"
          placeholder="请输入研发单位"
        />
      </el-form-item>
      <el-form-item label="应用用户量" prop="appUserNumber" label-width="140px">
        <el-input
          v-model="addFormData.appUserNumber"
          autocomplete="off"
          placeholder="请输入应用用户量"
        />
      </el-form-item>
      <el-form-item label="来源" prop="originType" label-width="140px">
        <el-select v-model="addFormData.originType" placeholder="请选择">
          <el-option label="设备基本信息" value="设备基本信息" />
          <el-option label="设备基本信息1" value="设备基本信息1" />
        </el-select>
      </el-form-item>
      <el-form-item label="机构" prop="organization" label-width="140px">
        <el-input
          v-model="addFormData.organization"
          autocomplete="off"
          placeholder="请输入机构"
        />
      </el-form-item>
      <el-form-item label="描述" prop="appDesc" label-width="140px">
        <el-input
          v-model="addFormData.appDesc"
          autocomplete="off"
          placeholder="请输入描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(addFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
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
