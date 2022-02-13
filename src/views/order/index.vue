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
          :setAddPanelVisible="setAddPanelVisible"
          :setTransferVisible="setTransferVisible"
          :setSearchShow="setSearchShow"
          :refreshData="refreshData"
        ></ControlPanel>
      </div>
      <!--数据部分-->
      <el-table
        ref="MenuTable"
        :data="dataList"
        style="width: 100%; margin-top: 10px"
        highlight-current-row
      >
        <el-table-column
          v-if="!transferValue.includes('订单编号')"
          align="center"
          prop="id"
          label="订单编号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('用户名')"
          align="center"
          prop="username"
          width="100"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('地址')"
          align="center"
          width="170"
          label="地址"
          ><template slot-scope="scope">{{
            scope.row.address.trim() || "无"
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('创建时间')"
          align="center"
          width="180"
          label="创建时间"
        >
          <template slot-scope="scope">
            <el-icon class="el-icon-time" />
            {{ scope.row.createtime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('更新时间')"
          align="center"
          width="180"
          label="上次登录时间"
        >
          <template slot-scope="scope">
            <el-icon class="el-icon-time" />
            {{ scope.row.updatime }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('物品名称')"
          align="center"
          min-width="80"
          label="物品名称"
          ><template slot-scope="scope">
            ￥{{ scope.row.userConsume }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('订单状态')"
          align="center"
          min-width="80"
          label="订单状态"
        >
        </el-table-column>
        <el-table-column align="center" min-width="179px" label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.paystatue"
              active-text="按月付费"
              inactive-text="按年付费"
            >
            </el-switch>
          </template>
        </el-table-column>
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
    <!--显隐列 弹出层-->
    <el-dialog
      title="显隐列设置"
      :visible.sync="transferVisible"
      width="635px"
      append-to-body
      center
    >
      <el-transfer
        v-model="transferValue"
        :data="transferData"
        :titles="transferTitles"
      >
      </el-transfer>
    </el-dialog>
  </div>
</template>

<script>
import SearchPanel from "@/views/component/SearchPanel";
import ControlPanel from "@/views/component/ControlPanel";
// import { messageInfo } from "@/utils/MessageInfo";
// import { resultCheck } from "@/utils/result";
// import { apiSearchRole, apiGetAllRole } from "@/api/role";

export default {
  name: "Role",
  components: {
    SearchPanel,
    ControlPanel,
  },
  data() {
    return {
      //=======================  表单信息  ===========================
      allData: [], //表单数据
      dataList: [], //显示表单数据
      total: 0, //数据量
      size: 7, //每页大小
      current: 1, //当前页
      loading: false, //表单是否加载
      searchShow: true, //查询功能是否开启
      //=======================  穿梭表单  ===========================
      transferTitles: ["显示列", "隐藏列"], //穿梭表单title
      transferValue: ["用户名", "创建时间", "发售时间", "物品编号"], //穿梭表单选中数据
      transferData: [
        {
          key: "订单编号",
          value: 1,
        },
        {
          key: "用户名",
          value: 2,
        },
        {
          key: "地址",
          value: 3,
        },
        {
          key: "创建时间",
          value: 5,
        },
        {
          key: "更新时间",
          value: 6,
        },
        {
          key: "物品编号",
          value: 7,
        },
        {
          key: "物品名称",
          value: 8,
        },
        {
          key: "订单状态",
          value: 8,
        },
      ], //穿梭表单数据
      transferVisible: false, //显隐列是否开启
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    setSearchShow() {
      this.searchShow = !this.searchShow;
    },
    setTransferVisible() {
      this.transferVisible = !this.transferVisible;
    },
    //=======================  查询部分  ===========================
    initData() {
      this.loading = true;
      // apiGetAllRole()
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.allData = res.data;
      //       this.total = this.allData.length;
      //       if (this.current * this.size < this.allData.length) {
      //         this.dataList = this.allData.slice(
      //           (this.current - 1) * this.size,
      //           this.current * this.size
      //         );
      //       } else {
      //         this.dataList = this.allData.slice(
      //           (this.current - 1) * this.size
      //         );
      //       }
      //     } else {
      //       messageInfo({ type: "error", message: res.message });
      //     }
      // this.loading = false;
      // })
      // .catch((e) => console.log(e));
    },
    //  查询信息
    searchInfo(searchKey) {
      console.log(searchKey);
      // apiSearchRole({ username: searchKey }).then((res) => {
      //   this.dataList = resultCheck(res, true);
      // });
    },
    //  刷新
    refreshData() {
      this.initData();
    },
    //=======================   信息  ===========================
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