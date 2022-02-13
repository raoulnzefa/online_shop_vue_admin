
<template>
  <div class="log">
    <div class="save-container">
      <!--添加-->
      <div class="save-box">
        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-plus"
          @click="handleAddPanelVisible"
          >添加
        </el-button>
      </div>
      <!--关闭-->
      <div class="close-box">
        <el-tooltip content="关闭查询" placement="bottom">
          <el-button
            type="primary"
            size="small"
            plain
            circle
            icon="el-icon-search"
            @click="handleSearchShow"
          />
        </el-tooltip>
        <el-tooltip content="刷新数据" placement="bottom">
          <el-button
            type="success"
            size="small"
            plain
            circle
            icon="el-icon-refresh"
            @click="refreshData"
          />
        </el-tooltip>
        <el-tooltip content="显隐列" placement="bottom">
          <el-button
            type="warning"
            size="small"
            plain
            circle
            icon="el-icon-menu"
            @click="handleTransferVisible"
          />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlPanel",
  props: [
    "setAddPanelVisible",
    "setTransferVisible",
    "setSearchShow",
    "refreshData",
  ],
  methods: {
    handleAddPanelVisible() {
      this.setAddPanelVisible();
    },
    handleTransferVisible() {
      this.setTransferVisible();
    },
    handleSearchShow() {
      this.setSearchShow();
    },
  },
};
</script>

<style scoped>
.save-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>