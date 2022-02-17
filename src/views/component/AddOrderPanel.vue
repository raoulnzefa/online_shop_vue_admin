<template>
  <div class="addPanel">
    <el-drawer
            :title="
        '修改地址'
      "
            :visible.sync="addPanelVisible"
            append-to-body
            direction="rtl"
            size="28%"
            :before-close="leave"
    >
      <div class="save-container">
        <el-form
                ref="updateDataCheck"
                :rules="rule"
                :model="updateData"
                label-width="90px"
                class="demo-ruleForm"
        >
          <el-form-item label="订单号">
            <el-input
                    v-model="updateData.orderId"
                    border
                    placeholder="请输入用户名称..."
                    :disabled="true"
            />
          </el-form-item>
          <el-form-item label="收货人姓名">
            <el-input
                    v-model="updateData.orderUser"
                    border
                    placeholder="请输入收货人姓名..."
            />
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input
                    v-model="updateData.orderAddr"
                    border
                    placeholder="请输入收货地址..."
            />
          </el-form-item>
          <el-form-item label="收货电话">
            <el-input
                    border
                    v-model="updateData.orderTel"
                    placeholder="请输入收货电话..."
            />
          </el-form-item>
          <el-form-item align="center">
            <el-button
                    icon="el-icon-sunny"
                    size="small"
                    type="success"
                    plain
                    @click="saveOrderContent()"
            >
              确定
            </el-button>
            <el-popconfirm
                    style="margin-left: 10px"
                    title="确定要重置信息吗？"
                    @confirm="leave"
            >
              <el-button
                      icon="el-icon-refresh"
                      size="small"
                      type="warning"
                      plain
                      slot="reference"
              >取消</el-button
              >
            </el-popconfirm>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import { apiUpdateOrder } from "@/api/order";
  import { messageInfo } from "@/utils/MessageInfo";
  export default {
    name: "AddOrderPanel",
    props: [
      "addPanelVisible",
      "setAddPanelVisible",
      "refreshData",
 //     "clearForm",
      "updateData",
    ],
    data() {
      return {
        rule: {
          orderUser: [
            { required: true, message: "用户名称不能为空！", trigger: "blur" },
          ],
         orderAddr: [
            { required: true, message: "用户密码不能为空！", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      //=======================  新增/修改菜单部分  ===========================
      leave() {
        this.$confirm("数据不会临时保存，切勿离开此界面！").then(() => {
          this.clearForm();
          this.$refs["updateDataCheck"].clearValidate();
          this.setAddPanelVisible();
        });
      },

      clearForm() {
        // this.setAddPanelVisible()
        this.addPanelVisible = true;

      },

      //  添加菜单/目录信息
      saveOrderContent() {
       // this.$refs[formName].validate((valid) => {
       //   if (valid) {
              let data = {
                orderId: this.updateData.orderId,
                orderUser: this.updateData.orderUser,
                orderAddr: this.updateData.orderAddr,
                orderTel: this.updateData.orderTel
              };
              apiUpdateOrder(data).then((res=>{
                if (res){
                  messageInfo({ type: "success", message: "修改成功" });
                }
              }));
              // if (this.oldUserAmount > this.updateData.userAmount) {
              //   let value = this.oldUserAmount - this.updateData.userAmount;
              //   apiCost({
              //     userId: this.updateData.user.userId,
              //     money: value,
              //   });
              // } else if (this.oldUserAmount < this.updateData.userAmount) {
              //   let value = this.updateData.userAmount - this.oldUserAmount;
              //   apiTopUp({
              //     userId: this.updateData.user.userId,
              //     money: value,
              //   });
              // }
              //
            this.$nextTick(() => {
              this.refreshData();
              this.setAddPanelVisible();
            });
          }
      //  });
   //   },

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