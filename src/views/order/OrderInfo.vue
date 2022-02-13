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
              :tree-props="{ children: 'orderInfos', hasChildren: 'hasChildren' }"
      >

        <el-table-column
                v-if="!transferValue.includes('物品名称')"
                align="center"
                prop="pname"
                width="150"
                label="订单号"
        >
            <template slot-scope="scope" v-if="!scope.row.productInfos">
                       {{ scope.row.orderId}}
            </template>
        </el-table-column>
          <el-table-column
                  v-if="!transferValue.includes('买家id')"
                  align="center"
                  prop="pname"
                  width="120"
                  label="买家id"
          >
              <template slot-scope="scope" v-if="!scope.row.productInfos">
                  {{ scope.row.userId }}
              </template>
          </el-table-column>
        <el-table-column
                v-if="!transferValue.includes('订单总价')"
                align="center"
                width="120"
                style="color: red"
                label="订单总价"
        >
          <template slot-scope="scope" v-if="!scope.row.productInfos">
            ￥{{ scope.row.orderPrice }}
          </template>
        </el-table-column>
          <el-table-column
                  v-if="!transferValue.includes('物品名称')"
                  align="center"
                  prop="pname"
                  width="150"
                  label="订单号"
          >
              <template slot-scope="scope" v-if="!scope.row.productInfos">
                  <el-popover trigger="hover" placement="top">
                      <div v-for="(product,index) in scope.row.products" :key="index">
                          <el-tag size="small" type="success">商品{{index+1}}</el-tag>
                          <p>商品名: {{ product.pname }}</p>
                          <p>价格: {{ product.price }}</p>
                          <p>数量: {{ product.pcount }}</p>
                      </div>
                      <el-tag size="small" type="warning">快递信息：</el-tag>
                          <p>收货人: {{ scope.row.orderUser}}</p>
                          <p>收货地址: {{ scope.row.orderAddr }}</p>
                          <p>收货电话： {{ scope.row.orderTel }}</p>


                      <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">详细信息</el-tag>
                      </div>
                  </el-popover>
              </template>
          </el-table-column>
          <el-table-column
                  v-if="!transferValue.includes('创建时间')"
                  align="center"
                  width="200"
                  style="color: red"
                  label="创建时间"
          >
              <template slot-scope="scope" v-if="!scope.row.productInfos">
                  ￥{{ scope.row.createdTime }}
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
    <AddOrderPanel
            :addPanelVisible="addPanelVisible"
            :setAddPanelVisible="setAddPanelVisible"
            :refreshData="refreshData"
            :clearForm="clearForm"
            :addChildren="addChildren"
            :updateData="updateData"
            :types="types"
    ></AddOrderPanel>
  </div>
</template>

<script>
  import SearchPanel from "@/views/component/SearchPanel";
  import ControlPanel from "@/views/component/ControlPanel";
  import AddOrderPanel from "@/views/component/AddOrderPanel";
  import { messageInfo } from "@/utils/MessageInfo";
  import { resultCheck } from "@/utils/result";
  import { apiGetList3,apiGetList1  } from "@/api/order.js";
  import {
   // apiGetAllProduct,
    // apiSearchProduct,
   // apiSearchProduct1,
    apiDeleteProduct,
  } from "@/api/product";
  import { apiDeleteProductInfo,apiSelectProductInfo } from "@/api/productInfo";
  // import { apiListType } from "@/api/type";

  export default {
    name: "OrderInfo",
    components: {
      SearchPanel,
      ControlPanel,
      AddOrderPanel: AddOrderPanel,
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
        orders: [],
        loading: false, //表单加载
        searchShow: true, //查询功能是否开启

        //=======================  穿梭表单  ===========================
        transferTitles: ["显示列", "隐藏列"], //穿梭表单title
        transferValue: [], //穿梭表单选中数据
        transferData: [
          {
            key: "订单号",
            value: 2,
          },
          {
            key: "买家id",
            value: 3,
          },
          {
            key: "创建时间",
            value: 4,
          },
          {
            key: "订单总价",
            value: 5,
          },
          //   {
          //       key: "标签",
          //       value: 6,
          //   },
          // {
          //   key: "收货人",
          //   value: 7,
          // },
          //   {
          //       key: "收货地址",
          //       value: 8,
          //   },
          //   {
          //       key: "收货电话",
          //       value: 9,
          //   },
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

            apiGetList3().then((res) => {
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
            });


      },

      getName(ppid) {
        apiSelectProductInfo({ppid: ppid}).then((res) => {
          this.pname = res.data.pname;
        });
      },
      // //显示标签
      // showTag(tid) {
      //   for (let i = 0; i < this.types.length; i++) {
      //     if (this.types[i].id === tid) {
      //       return this.types[i].name;
      //     }
      //   }
      //   return "无标签";
      // },
      //  查询菜单信息
      searchInfo(searchKey) {
        if (searchKey.trim() !== "") {
          // apiSearchProduct({ pname: searchKey }).then((res) => {
            apiGetList1({ userId: searchKey }).then((res) => {
            this.dataList = resultCheck(res, true);
            this.total = this.dataList.length
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