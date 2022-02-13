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
        :row-key="getRowKeys"
        lazy
        highlight-current-row
        v-loading="loading"
        :tree-props="{ children: 'productInfos', hasChildren: 'hasChildren' }"
      >
        >
        <el-table-column align="center" label="展开" width="100">
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('物品名称')"
          align="center"
          prop="pname"
          width="120"
          label="物品名称"
        >
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('标签')"
          align="center"
          width="140"
          label="标签"
        >
          <template slot-scope="scope"
            ><el-tag v-if="scope.row.productInfos">{{
              showTag(scope.row.tid)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('库存')"
          align="center"
          width="100"
          label="库存"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.productInfos">
              {{
                scope.row.productInfos.reduce(
                  (sum, productInfos) => sum + productInfos.pnumber,
                  0
                )
              }}
            </div>
            <div v-else>{{ scope.row.pnumber }}</div>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          v-if="!transferValue.includes('销量')"-->
<!--          align="center"-->
<!--          width="100"-->
<!--          label="销量"-->
<!--        >-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.productInfos">-->
<!--              {{-->
<!--                scope.row.productInfos.reduce(-->
<!--                  (sum, productInfos) => sum + productInfos.allsalenumber,-->
<!--                  0-->
<!--                )-->
<!--              }}-->
<!--            </div>-->
<!--            <div v-else>{{ scope.row.sales }}</div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
                v-if="!transferValue.includes('销量')"
                align="center"
                width="80"
                style="color: red"
                label="销量"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.productInfos">
              {{
              scope.row.productInfos.reduce(
              (sum, productInfos) => sum + productInfos.allsalenumber,
              0
              )
              }}
            </div>
            <div v-else>{{ scope.row.allsalenumber }}</div>
          </template>
<!--          <template slot-scope="scope" v-if="!scope.row.productInfos">-->
<!--            {{ scope.row.allsalenumber}}-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
          v-if="!transferValue.includes('价格')"
          align="center"
          width="80"
          style="color: red"
          label="价格"
        >
          <template slot-scope="scope" v-if="!scope.row.productInfos">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column
                v-if="!transferValue.includes('图片')"
                align="center"
                width="300"
                style="color: red"
                label="图片"
        >
          <template slot-scope="scope" v-if="!scope.row.productInfos">
<!--            <el-image>scope.row.pimg </el-image>-->
            <div class="demo-image__preview">
              <el-image
                      style="width: 100px; height: 100px"
                      :src="'http://localhost:8080/images/'+scope.row.pimg"
                      :preview-src-list="['http://localhost:8080/images/'+scope.row.pimg]">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="179px" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="toUpdate(scope.row)"
              v-if="scope.row.productInfos"
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
    <AddProductPanel
      :addPanelVisible="addPanelVisible"
      :setAddPanelVisible="setAddPanelVisible"
      :refreshData="refreshData"
      :clearForm="clearForm"
      :addChildren="addChildren"
      :updateData="updateData"
      :types="types"
    ></AddProductPanel>
  </div>
</template>

<script>
import SearchPanel from "@/views/component/SearchPanel";
import ControlPanel from "@/views/component/ControlPanel";
import AddProductPanel from "@/views/component/AddProductPanel";
import { messageInfo } from "@/utils/MessageInfo";
import { resultCheck } from "@/utils/result";
import {
  apiGetAllProduct,
  apiSearchProduct,
  apiDeleteProduct,
} from "@/api/product";
import { apiDeleteProductInfo } from "@/api/productInfo";
import { apiListType } from "@/api/type";

export default {
  name: "ProductInfo",
  components: {
    SearchPanel,
    ControlPanel,
    AddProductPanel,
  },
  data() {
    return {
      //=======================  表单信息  ===========================
      allData: [], //表单数据
      dataList: [],
      types: [],
      updateData: {
        tpId: -1,
        tid: 11101,
        productInfos: [],
      },
      total: 0,
      size: 7,
      current: 1,
      loading: false, //表单加载
      searchShow: true, //查询功能是否开启

      //=======================  穿梭表单  ===========================
      transferTitles: ["显示列", "隐藏列"], //穿梭表单title
      transferValue: ["销量"], //穿梭表单选中数据
      transferData: [
        {
          key: "物品名称",
          value: 2,
        },
        // {
        //   key: "物品信息",
        //   value: 3,
        // },
        {
          key: "库存",
          value: 4,
        },
        {
          key: "销量",
          value: 5,
        },
        {
          key: "图片",
          value: 6,
        },
        {
          key: "标签",
          value: 7,
        },
        {
          key: "价格",
          value: 8,
        },
      ], //穿梭表单数据
      transferVisible: false, //显隐列是否开启
      //=======================  菜单  ===========================
      addPanelVisible: false, //新增信息
    };
  },
  mounted() {
    this.initData();
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
      apiListType().then((res) => {
        if (res.status) {
          this.types = res.data;
        }
      });
      apiGetAllProduct()
        .then((res) => {
          if (res.status) {
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
        .catch((e) => {
          console.log(e);
        });
    },
    //显示标签
    showTag(tid) {
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].id === tid) {
          return this.types[i].name;
        }
      }
      return "无标签";
    },
    //  查询菜单信息
    searchInfo(searchKey) {
      if (searchKey.trim() !== "") {
        apiSearchProduct({ pname: searchKey }).then((res) => {
          this.dataList = resultCheck(res, true);
        });
      } else {
        messageInfo({ type: "warning", message: "关键词不能为空哦！" });
      }
    },
    //  清空菜单名称
    refreshData() {
      this.initData();
    },
    //  清空表单信息
    clearForm() {
      this.updateData = {
        tpId: -1,
        tid: this.types[0].id || 11101,
        productInfos: [],
      };
    },
    // 添加类型
    addChildren() {
      this.updateData.productInfos.push({
        pname: "",
        price: 0,
        pnumber: 1,
        pimg:"",
        isNew: true,
      });
    },
    //=======================   删除菜单信息  ===========================
    deleteMenu(data) {
      this.$confirm(
        `确认要删除名称为： <strong>${data.pname}</strong> 的信息吗？`,
        {
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        if (data.productInfos) {
          apiDeleteProduct({ pid: data.tpId }).then((res) => {
            resultCheck(res, true);
          });
        } else {
          this.dataList.forEach((item) => {
            if (item.pid === data.pid) {
              if (item.productInfos.length > 1) {
                apiDeleteProductInfo({ ppid: data.id }).then((res) => {
                  resultCheck(res, true);
                });
              } else {
                this.$message("每种物品至少保留一种类型");
              }
            }
          });
        }
        this.initData();
      });
    },
    //表单所需的key
    getRowKeys(row) {
      if (row.ppid) return row.ppid;
      return row.tpId;
    },
    //  跳转至修改界面
    toUpdate(proiductData) {
      this.updateData = JSON.parse(JSON.stringify(proiductData));

      this.updateData.productInfos = JSON.parse(
        JSON.stringify(proiductData.productInfos)
      );
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