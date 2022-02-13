
<template>
  <div class="log">
    <div class="search-container" v-show="searchShow">
      <el-input
        style="width: 25%; margin-right: 10px"
        placeholder="请输入关键词..."
        size="small"
        prefix-icon="el-icon-search"
        clearable
        @clear="handleClear"
        v-model="searchKey"
      >
      </el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="handleSearch"
        style="margin-left: 10px"
        >搜索
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  props: ["searchShow", "refreshData", "searchInfo"],
  data() {
    return {
      //查询条件
      searchKey: "",
    };
  },
  methods: {
    handleClear() {
      this.refreshData;
    },
    handleSearch() {
      this.searchInfo(this.searchKey);
    },
  },
};
</script>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  justify-content: left;
}
</style>