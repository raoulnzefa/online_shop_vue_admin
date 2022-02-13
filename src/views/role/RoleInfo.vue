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
          v-if="!transferValue.includes('用户ID')"
          align="center"
          prop="user.id"
          label="用户ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('用户名')"
          align="center"
          prop="user.username"
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
            scope.row.user.address || "无"
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('详细地址')"
          align="center"
          min-width="200"
          label="详细地址"
          ><template slot-scope="scope">{{
            scope.row.user.detailAddress || "无"
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
            {{ scope.row.user.createtime }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          v-if="!transferValue.includes('修改时间')"
          align="center"
          width="180"
          label="修改时间"
        >
          <template slot-scope="scope">
            <el-icon class="el-icon-time" />
            {{ scope.row.user.updatime }}
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="!transferValue.includes('账户余额')"
          align="center"
          min-width="80"
          label="账户余额"
          ><template slot-scope="scope">
            ￥{{ scope.row.userAmount }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('账户花费')"
          align="center"
          min-width="80"
          label="账户花费"
          ><template slot-scope="scope">
            ￥{{ scope.row.userConsume }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="179px" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="toUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="deleteMenu(scope.row)"
              >删除</el-button
            >
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
    <!--新增 弹出层-->
    <AddRolePanel
      :addPanelVisible="addPanelVisible"
      :setAddPanelVisible="setAddPanelVisible"
      :refreshData="refreshData"
      :clearForm="clearForm"
      :updateData="updateData"
      :oldUserAmount="oldUserAmount"
    ></AddRolePanel>
  </div>
</template>

<script>
import SearchPanel from "@/views/component/SearchPanel";
import ControlPanel from "@/views/component/ControlPanel";
import AddRolePanel from "@/views/component/AddRolePanel";
import { messageInfo } from "@/utils/MessageInfo";
import { resultCheck } from "@/utils/result";
import { apiSearchRole, apiGetAllRole, apiDeleteRole } from "@/api/role";

export default {
  name: "Role",
  components: {
    SearchPanel,
    ControlPanel,
    AddRolePanel,
  },
  data() {
    return {
      //=======================  表单信息  ===========================
      allData: [], //表单数据
      dataList: [],
      updateData: {
        user: {
          id: -1,
          username: "",
          password: "",
          address: "",
          detailAddress: "",
        },
        userAmount: 0,
        userConsume: 0,
      },
      oldUserAmount: 0, //
      total: 0,
      size: 7,
      current: 1,
      loading: false, //表单加载
      searchShow: true, //查询功能是否开启

      //=======================  穿梭表单  ===========================
      transferTitles: ["显示列", "隐藏列"], //穿梭表单title
      transferValue: ["用户ID", "创建时间"], //穿梭表单选中数据
      transferData: [
        {
          key: "用户ID",
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
          key: "详细地址",
          value: 4,
        },
        {
          key: "创建时间",
          value: 5,
        },
        // {
        //   key: "修改时间",
        //   value: 6,
        // },
        {
          key: "账户余额",
          value: 7,
        },
        {
          key: "账户花费",
          value: 8,
        },
      ], //穿梭表单数据
      transferVisible: false, //显隐列是否开启
      //=======================  菜单  ===========================
      addPanelVisible: false, //新增信息
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    setSearchShow() {
      this.searchShow = !this.searchShow;
    },
    setAddPanelVisible() {
      this.addPanelVisible = !this.addPanelVisible;
    },
    setTransferVisible() {
      this.transferVisible = !this.transferVisible;
    },
    //=======================  查询菜单部分  ===========================
    initData() {
      this.loading = true;
      apiGetAllRole()
        .then((res) => {
          if (res.status === 200) {
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
    //  查询用户信息
    searchInfo(searchKey) {
      if (searchKey.trim() !== "") {
        apiSearchRole({ userid: searchKey })
          .then((res) => {
            this.dataList = [];
            this.dataList.push(res.data);
          })
          .catch(() => {
            this.dataList = null;
          });
      } else {
        messageInfo({ type: "warning", message: "关键词不能为空哦！" });
      }
    },
    //  刷新
    refreshData() {
      this.initData();
      this.clearForm();
    },
    //  清空表单信息
    clearForm() {
      this.updateData = {
        user: {
          id: -1,
          username: "",
          password: "",
          address: "",
          detailAddress: "",
        },
        userAmount: 0,
        userConsume: 0,
      };
      this.oldUserAmount = 0;
    },
    //=======================   删除用户信息  ===========================
    deleteMenu(data) {
      this.$confirm(
        `确认要删除名称为： <strong>${data.user.username}</strong> 的信息吗？`,
        {
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        apiDeleteRole({ userId: data.user.id }).then((res) => {
          resultCheck(res, true);
          this.initData();
        });
      });
    },
    //  跳转至修改界面
    toUpdate(userData) {
      this.updateData = JSON.parse(JSON.stringify(userData));
      this.oldUserAmount = this.updateData.userAmount;
      this.addPanelVisible = true;
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