<script setup lang="ts">
import { ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

// 搜索表单数据
interface SearchData {
  markAddress?: string; // 标识地址
  app?: string; // 应用
}

// 表单数据接口
interface FormData {
  markAddress?: string; // 标识地址
  app?: string; // 绑定应用
  templateId?: number; // 模版id
  deviceId?: number | string | undefined; // 设备id
  deviceNo?: string; // 设备编号
  deviceName?: string; // 设备名称
  stationId?: number | string | undefined; // 站库id
}

// 表格数据接口
interface TableData {
  id?: string; // 机构id
  markAddress?: string; // 标识地址
  templateId?: number; // 模版id
  markType?: string; // 标识属性
  unknownFields?: string; // 未知字段
  createTime?: string; // 创建时间
}

const loading = ref(false);

const searchFormRef = ref();
const searchData = ref<SearchData>({});

const addFormRef = ref();
const addFormData = ref<FormData>({});
const addFormRules = ref<FormRules<FormData>>({
  markAddress: [{ required: true, message: "请输入标识地址", trigger: "blur" }],
  app: [{ required: true, message: "请选择应用", trigger: "blur" }],
  templateId: [{ required: true, message: "请选择模版", trigger: "blur" }],
  deviceId: [{ required: true, message: "请输入设备id", trigger: "blur" }],
  deviceNo: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
  deviceName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  stationId: [{ required: true, message: "请输入站库id", trigger: "blur" }]
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
    id: "1",
    markAddress: "MA.113.120.119M/1003/",
    templateId: 110,
    markType: "私有",
    unknownFields: "字段内容",
    createTime: "2023-03-04 13:23:01"
  },
  {
    id: "1",
    markAddress: "MA.113.120.119M/1003/",
    templateId: 110,
    markType: "私有",
    unknownFields: "字段内容",
    createTime: "2023-03-04 13:23:01"
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
      <el-form-item label="标识地址">
        <el-input
          v-model="searchData.markAddress"
          placeholder="请输入标识地址"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="应用">
        <el-select
          v-model="searchData.app"
          placeholder="请选择应用"
          class="!w-[180px]"
        >
          <el-option label="私有" value="私有" />
          <el-option label="公有" value="公有" />
        </el-select>
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
      <el-table-column prop="markAddress" label="标识地址" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="templateId" label="模版id" />
      <el-table-column prop="markType" label="标识属性" />
      <el-table-column prop="unknownFields" label="未知字段" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default>
          <el-button
            link
            type="primary"
            size="small"
            @click="detailDrawer = true"
            >详情</el-button
          >
          <!--          <el-button-->
          <!--            link-->
          <!--            type="primary"-->
          <!--            size="small"-->
          <!--            @click="openDialog(scope.row)"-->
          <!--            >编辑</el-button-->
          <!--          >-->
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
      <el-form-item label="标识地址" prop="markAddress" label-width="140px">
        <el-input
          v-model="addFormData.markAddress"
          autocomplete="off"
          placeholder="请输入标识地址"
        >
          <template #prepend>MA.113.120.119M/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="绑定应用" prop="app" label-width="140px">
        <el-select v-model="addFormData.app" placeholder="请选择绑定应用">
          <el-option label="测试应用" value="测试应用" />
          <el-option label="测试应用1" value="测试应用1" />
        </el-select>
      </el-form-item>
      <el-form-item label="模版" prop="templateId" label-width="140px">
        <el-select v-model="addFormData.templateId" placeholder="请选择模版">
          <el-option label="设备基本信息" value="设备基本信息" />
          <el-option label="设备基本信息1" value="设备基本信息1" />
        </el-select>
      </el-form-item>
      <el-divider content-position="left">标识数据</el-divider>

      <el-form-item label="设备ID" prop="deviceId" label-width="140px">
        <el-input
          v-model="addFormData.deviceId"
          autocomplete="off"
          placeholder="请输入设备ID"
        />
      </el-form-item>
      <el-form-item label="设备编码" prop="deviceNo" label-width="140px">
        <el-input
          v-model="addFormData.deviceNo"
          autocomplete="off"
          placeholder="请输入设备编码"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="deviceName" label-width="140px">
        <el-input
          v-model="addFormData.deviceName"
          autocomplete="off"
          placeholder="请输入设备名称"
        />
      </el-form-item>
      <el-form-item label="站库ID" prop="stationId" label-width="140px">
        <el-input
          v-model="addFormData.stationId"
          autocomplete="off"
          placeholder="请输入站库ID"
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
