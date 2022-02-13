<template>
  <div class="addPanel">
    <el-drawer
      :title="
        updateData.user.id === -1 ? '新增用户/目录信息' : '修改用户/目录信息'
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
          <el-form-item label="用户账号">
            <el-input
              v-model="updateData.user.userId"
              border
              placeholder="请输入用户名称..."
              :disabled="this.updateData.user.id !== -1"
            />
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input
              v-model="updateData.user.username"
              border
              placeholder="请输入用户名称..."
            />
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input
              v-model="updateData.user.password"
              border
              placeholder="请输入用户密码..."
            />
          </el-form-item>
          <el-form-item label="地址">
            <el-input
              v-model="updateData.user.address"
              border
              placeholder="请输入用户地址..."
            />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              border
              v-model="updateData.user.detailAddress"
              placeholder="请输入用户详细地址..."
            />
          </el-form-item>
          <el-form-item
            label="账户余额"
            align="center"
            v-if="this.updateData.user.id !== -1"
          >
            <el-input-number
              v-model="updateData.userAmount"
              controls-position="right"
              size="small"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item align="center">
            <el-button
              icon="el-icon-sunny"
              size="small"
              type="success"
              plain
              @click="saveUserContent('updateDataCheck')"
            >
              确定
            </el-button>
            <el-popconfirm
              v-if="updateData.user.id === -1"
              style="margin-left: 10px"
              title="确定要重置信息吗？"
              @confirm="clearForm"
            >
              <el-button
                icon="el-icon-refresh"
                size="small"
                type="warning"
                plain
                slot="reference"
                >重置</el-button
              >
            </el-popconfirm>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { apiTopUp, apiCost } from "@/api/wallet";
import { apiAddRole, apiUpdateRole } from "@/api/role";
export default {
  name: "AddRolePanel",
  props: [
    "addPanelVisible",
    "setAddPanelVisible",
    "refreshData",
    "clearForm",
    "updateData",
    "oldUserAmount",
  ],
  data() {
    return {
      rule: {
        username: [
          { required: true, message: "用户名称不能为空！", trigger: "blur" },
        ],
        password: [
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

    //  添加菜单/目录信息
    saveUserContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.updateData.user.id === -1) {
            let data = {
              userId: this.updateData.user.userId,
              username: this.updateData.user.username,
              password: this.updateData.user.password,
              address: this.updateData.user.address,
              detailAddress: this.updateData.user.detailAddress,
            };
            apiAddRole(data);
          } else {
            let data = {
              id: this.updateData.user.id,
              userId: this.updateData.user.userId,
              username: this.updateData.user.username,
              password: this.updateData.user.password,
              address: this.updateData.user.address,
              detailAddress: this.updateData.user.detailAddress,
            };
            apiUpdateRole(data);
            if (this.oldUserAmount > this.updateData.userAmount) {
              let value = this.oldUserAmount - this.updateData.userAmount;
              apiCost({
                userId: this.updateData.user.userId,
                money: value,
              });
            } else if (this.oldUserAmount < this.updateData.userAmount) {
              let value = this.updateData.userAmount - this.oldUserAmount;
              apiTopUp({
                userId: this.updateData.user.userId,
                money: value,
              });
            }
          }
          this.$nextTick(() => {
            this.refreshData();
            this.setAddPanelVisible();
          });
        }
      });
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