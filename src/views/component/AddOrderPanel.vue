<template>
  <div class="addPanel">
    <el-drawer
      :title="
        updateData.tpId === -1 ? '新增物品/目录信息' : '修改物品/目录信息'
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
          <el-form-item label="物品名称" prop="pname">
            <el-input
              v-model="updateData.pname"
              border
              label="product"
              placeholder="请输入物品名称..."
            />
          </el-form-item>

          <el-form-item label="标签">
            <div v-for="type in types" :key="type.id">
              <el-radio
                v-model="updateData.tid"
                :label="type.id"
                border
                size="mini"
                >{{ type.name }}</el-radio
              >
            </div>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >新建标签</el-button
            >
          </el-form-item>
          <div v-for="(item, index) in updateData.productInfos" :key="index">
            <el-form-item>
              <el-tag type="success">第{{ index + 1 }}种类型：</el-tag>
            </el-form-item>
            <el-form-item label="类型名称" align="center" prop="pname">
              <el-input
                border
                label="product"
                placeholder="请输入类型名称..."
                v-model="item.pname"
              />
            </el-form-item>
            <el-form-item label="价格" align="center" prop="price">
              <el-input-number
                v-model="item.price"
                controls-position="right"
                size="small"
                :min="0"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="库存" align="center" prop="pnumber">
              <el-input-number
                v-model="item.pnumber"
                controls-position="right"
                size="small"
                :min="1"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="封面" align="center" prop="pimg" v-model="item.pimg">
              <div v-if=!item.pimg>
              <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-change="changImage"
                       limit="1"
                      v-model="item.pimg">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img  width="100%" :src=dialogImageUrl alt="">
              </el-dialog>
<!--                  <el-input v-model="item.pimg" disabled style="display:none"></el-input>-->
              </div>
              <div v-else>
                <img  width="100%"   :src="'http://localhost:8080/images/'+item.pimg">
              </div>
            </el-form-item>

          </div>
          <el-form-item align="center" v-if="this.updateData.tpId !== -1">
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              @click="addChildren"
              >添加类型</el-button
            >
          </el-form-item>
          <el-form-item align="center">
            <el-button
              icon="el-icon-sunny"
              size="small"
              type="success"
              plain
              @click="saveProductContent('updateDataCheck')"
            >
              确定
            </el-button>
            <el-popconfirm
              v-if="updateData.tpId === -1"
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
import { resultCheck } from "@/utils/result";
import { apiAddProduct, apiUpdateProduct } from "@/api/product";
import { apiAddProductInfo, apiUpdateProductInfo } from "@/api/productInfo";
import { apiAddType } from "@/api/type";
export default {
  name: "AddOrderPanel",
  props: [
    "addPanelVisible",
    "setAddPanelVisible",
    "refreshData",
    "clearForm",
    "addChildren",
    "updateData",
    "types",
  ],
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      rule: {
        pname: [
          { required: true, message: "物品名称不能为空！", trigger: "blur" },
        ],
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl:''
    };
  },
  methods: {
    openFile: function () {
      document.getElementById('open').click()
      this.showRealPath()
    },
    showRealPath: function () {
      // document.getElementById('input01').value = document.getElementById('open').value
      this.item.pimg = document.getElementById('open').value
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //=======================  新增/修改菜单部分  ===========================
    // 离开时初始化
    leave() {
      this.$confirm("数据不会临时保存，切勿离开此界面！").then(() => {
        this.clearForm();
        this.$refs["updateDataCheck"].clearValidate();
        this.setAddPanelVisible();
        console.log(this.updateData);
      });
    },
    // 显示输入框添加type
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 确认新添的type
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.trim()) {
        let data = { name: inputValue.trim() };
        apiAddType(data).then((res) => {
          resultCheck(res, true);
          this.refreshData();
          this.inputVisible = false;
          this.inputValue = "";
        });
      }
    },
    //  添加或者更新物品/目录信息
    saveProductContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否为新添物品
          if (this.updateData.tpId === -1) {
            apiAddProduct(this.updateData).then((res) => {
              resultCheck(res, true);
              // this.updateData.productInfos.forEach((productInfo) => {
              //   productInfo.pid = this.updateData.pid;
              //   apiAddProductInfo(productInfo).then((res) => {
              //     resultCheck(res, true);
              //   });
              // });
            });
          } else {
            apiUpdateProduct(this.updateData).then((res) => {
              resultCheck(res, true);
            });
            this.updateData.productInfos.forEach((productInfo) => {
              productInfo.pid = this.updateData.pid;
              //判断是否为新添类型
              if (productInfo.isNew) {
                apiAddProductInfo(productInfo).then((res) => {
                  resultCheck(res, true);
                });
              } else {
                apiUpdateProductInfo(productInfo).then((res) => {
                  resultCheck(res, true);
                });
              }
            });
          }
          this.$nextTick(() => {
            this.clearForm();
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
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>