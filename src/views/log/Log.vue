<template>
  <div class="animate__animated animate__fadeIn">
    <el-card>
      <!--查询部分-->
      <div class="top-container">
        <!--搜索部分-->
        <SearchPanel
          :searchShow="searchShow"
          :refreshData="refreshData"
          :searchInfo="searchInfo"
        ></SearchPanel>
        <!--添加部分-->
        <ControlPanel
          :setSearchShow="setSearchShow"
          :refreshData="refreshData"
        ></ControlPanel>
      </div>
      <!--数据部分-->
      <el-table
        ref="MenuTable"
        :data="dataList"
        style="width: 100%; margin-top: 10px"
        row-key="id"
        lazy
        highlight-current-row
      >
        <el-table-column align="center" prop="logId" label="日志ID" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userId"
          width="100"
          label="用户账号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="controller"
          width="500"
          label="操作"
        >
        </el-table-column>
        <el-table-column align="center" width="180" label="时间">
          <template slot-scope="scope">
            <el-icon class="el-icon-time" />
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" min-width="179px" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="deleteMenu(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <!-- 页码 -->
      <el-pagination
        class="page"
        background
        @size-change="refreshData"
        @current-change="currentChange"
        :current-page="current"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import SearchPanel from "@/views/component/SearchPanel";
import ControlPanel from "@/views/log/component/ControlPanel";
import { messageInfo } from "@/utils/MessageInfo";

import { apiGetListByUserId, apiGetList } from "@/api/log";

export default {
  name: "Log",
  components: {
    SearchPanel,
    ControlPanel,
  },
  data() {
    return {
      //=======================  表单信息  ===========================
      allData: [], //表单数据
      dataList: [],
      total: 0,
      size: 7,
      current: 1,
      loading: false, //表单加载
      searchShow: true, //查询功能是否开启
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    setSearchShow() {
      this.searchShow = !this.searchShow;
    },
    //=======================  查询部分  ===========================
    initData() {
      this.loading = true;
      apiGetList()
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.allData = res.data;
            this.total = this.allData.length;
            if (this.current * this.size < this.allData.length) {
              this.dataList = this.allData.slice(
                (this.current - 1) * this.size,
                this.current * this.size
              );
            } else {
              this.dataList = this.allData.slice(
                (this.current - 1) * this.size
              );
            }
          } else {
            messageInfo({ type: "error", message: res.message });
          }
          this.loading = false;
        })
        .catch((e) => console.log(e));
    },
    //  查询信息
    searchInfo(searchKey) {
      if (searchKey.trim() !== "") {
        apiGetListByUserId({ userId: searchKey }).then((res) => {
          this.allData = res.data;
          this.total = this.allData.length;
          if (this.current * this.size < this.allData.length) {
            this.dataList = this.allData.slice(
              (this.current - 1) * this.size,
              this.current * this.size
            );
          } else {
            this.dataList = this.allData.slice((this.current - 1) * this.size);
          }
        });
      } else {
        messageInfo({ type: "warning", message: "关键词不能为空哦！" });
      }
    },
    //  刷新
    refreshData() {
      this.initData();
    },
    //  当前页发生变化
    currentChange(current) {
      this.current = current;
      this.initData();
    },
  },
};
</script>

<style scoped>
.top-container {
  width: 100%;
}

.el-button--text {
  color: #70b2f8;
  font-size: 12px;
}
</style>